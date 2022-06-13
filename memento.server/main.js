const path = require("path");
const fs = require("fs");
let enhancedIndexHtmlContents = null;
const pino = require('pino');

function ajvPlugin(ajv, options) {
  ajv.addKeyword("isFileType", {
    compile: (schema, parent, it) => {
      // Change the schema type, as this is post validation it doesn't appear to error.
      parent.type = "file";
      delete parent.isFileType;
      return () => true;
    },
  });

  return ajv;
}

function insertInStrAfterFirst(haystack, needle, inserted) {
  const needlePos = haystack.indexOf(needle);
  if (needlePos === -1) {
    return haystack;
  }
  const needleEnd = needlePos + needle.length;
  return haystack.substring(0, needleEnd) +
    inserted + haystack.substring(needleEnd);
}

const fastify = require("fastify")({
  ajv: { plugins: [ajvPlugin] },
  logger: {
    prettyPrint: true,
    level: "warn",
  },
});

fastify
  .register(require("fastify-static"), {
    root: path.join(__dirname, "build"),
    wildcard: false,
    setHeaders: (res, filepath, stat) => {
      if (filepath.startsWith(path.join(__dirname, "build", "static"))) {
        res.setHeader("Cache-Control", "public;max-age=31536000");
      } else {
        res.setHeader("Cache-Control", "no-store");
      }
    }
  })
  .register(require("fastify-multipart"), {
    limits: {
      files: 2
    },
    addToBody: true
  })
  .register(require("fastify-swagger"), {
    routePrefix: "/swagger",
    swagger: {
      info: {
        title: "Memento Frontend",
        version: "1.0",
      },
    },
    exposeRoute: true,
  })
  .decorate("conf", {})
  .after(routes);

function routes() {
  require("./backend")(fastify);
  require("./content")(fastify);
  require("./nft")(fastify)
  require("./wallet")(fastify);;

  // create special route for invitation pages so they would have
  // OpenGraph tags in the index.html markup
  fastify.route({
    method: "GET",
    url: `/join/:refId`,
    handler: async (req, reply) => {
      if (!enhancedIndexHtmlContents) {
        let indexHtmlContents = null;
        await new Promise((resolve, reject) => {
          fs.readFile(
            path.join(__dirname, "build", "index.html"),
            "utf8",
            (err, data) => {
              if (err) {
                console.error("main.js: couldn't parse index.html");
                reject(err);
              }
              indexHtmlContents = data;
              resolve();
            }
          );
        });
        const host = req.hostname === "relica.world"
          ? "relica.world"
          : "dev.relica.world";
        const title = "Relica invite";
        const altTitle = "Invitation";
        const description = "You've been invited!";
        enhancedIndexHtmlContents = insertInStrAfterFirst(
          indexHtmlContents,
          "<head>",
          '<meta name="twitter:card" content="summary_large_image" />' +
          '<meta name="twitter:site" content="@Relicaworld" />' +
          `<meta name="twitter:title" content="${title}" />` +
          `<meta name="twitter:description" content="${description}" />` +
          `<meta name="twitter:image" content="https://${host}/invitation_2to1.jpg" />` +
          `<meta name="twitter:image:alt" content="${altTitle}" />` +
          `<meta property="og:url" content="https://${req.hostname}${req.raw.url}" />` +
          '<meta property="og:type" content="website" />' +
          `<meta property="og:title" content="${title}" />` +
          `<meta property="og:description" content="${description}" />`);
      }
      reply
        .code(200)
        .header("Cache-Control", "no-store")
        .header("Content-Type", "text/html;charset=utf-8")
        .send(enhancedIndexHtmlContents);
    },
  });

  // when no file found by fastify-static
  fastify.get("/*", (req, reply) => {
    reply.code(200).sendFile("index.html", path.join(__dirname, "build"));
  });
}

fastify.listen(process.env.PORT || 3006, "0.0.0.0", (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});

console.info("Bootstrap", process.env.PORT);
