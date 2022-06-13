const mkdirp = require("mkdirp");
const path = require("path");
const fs = require("fs");
const pump = require("pump");
const AWS = require("aws-sdk");
const axios = require("axios");
try {
  mkdirp.sync(path.join(__dirname, "pictures"));
} catch (err) {
  console.error(err);
}

module.exports = function (fastify) {
  fastify.route({
    schema: {
      tags: ["content"],
      body: {
        type: "object",
        properties: {
          contentId: { type: "string" },
          userId: { type: "string" },
          pictureId: { type: "string" },
        },
      },
    },
    method: "POST",
    url: "/api/content/associate",
    handler: async (request, reply) => {
      let { contentId, userId, pictureId } = request.body;

      pump(
        fs.createReadStream(
          path.join(__dirname, "pictures", pictureId + ".jpg")
        ),
        fs.createWriteStream(
          path.join(__dirname, "pictures", contentId + ".jpg")
        ),
        (err) => {
          if (err) {
            return reply.code(500).send();
          }
          reply.code(200).send();
        }
      );
    },
  });
  fastify.route({
    schema: {
      tags: ["content"],
      consumes: ["multipart/form-data"],
      body: {
        properties: {
          picture: { type: "string" },
        },
      },
    },
    method: "POST",
    url: `/api/content/upload`,
    handler: (request, reply) => {
      request.multipart(handler, onEnd);

      function onEnd(err) {
        console.error({ err });
        reply.code(204).send();
      }

      function handler(field, file, filename, encoding, mimetype) {
        pump(
          file,
          fs.createWriteStream(
            path.join(__dirname, "pictures", filename + ".jpg")
          )
        );
      }
    },
  });

  fastify.route({
    schema: {
      tags: ["content"],
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
      response: {
        200: {
          type: "string",
          format: "binary",
        },
      },
    },
    method: "GET",
    url: `/api/content/:id`,
    handler: async (request, reply) => {
      reply
        .code(200)
        .header("Content-Type", "image/jpg")
        .send(
          fs.createReadStream(
            path.join(__dirname, "pictures", request.params.id + ".jpg")
          )
        );
    },
  });

  fastify.route({
    schema: {
      summary: "upload file to s3 for temp processing",
      tags: ["tempUpload"],
      query: {
        type: "object",
        required: ["imageType"],
        properties: {
          imageType: { type: "string" },
        },
      },
      params: {
        type: "object",
        properties: {
          pictureId: { type: "string" },
        },
      },
      response: {
        200: {
          type: "string",
          format: "binary",
        },
        data: {
          type: "object",
        },
      },
    },
    method: "GET",
    url: `/api/temp/upload/:pictureId`,
    handler: async (request, reply) => {
      const { pictureId } = request.params;
      const { imageType, doNotOffload } = request.query;
      if (
        !doNotOffload &&
        process.env.NODE_ENV !== "production" &&
        request.ip === "127.0.0.1"
      ) {
        // we are on dev machine, off-load the request to the real dev server
        // get an IP of real dev.relica.world first,
        // in case there are any host replacing shenanigans
        let cfResp = await axios.get(
          "https://cloudflare-dns.com/dns-query?name=dev.relica.world&type=A",
          {
            headers: {
              Accept: "application/dns-json",
            }
          });
        if (!cfResp.error) {
          const ip = cfResp.data["Answer"][0]["data"];
          let response = await axios.get(
            `https://${ip}/api/temp/upload/${pictureId}`,
            {
              headers: {
                Host: "dev.relica.world",
              },
              params: {
                imageType,
                doNotOffload: 1,
              }
            }
          );
          if (!response.error) {
            reply.send(JSON.stringify({
              url: response.data.url,
            }));
            return;
          }
        }
      }
      const s3 = new AWS.S3({
        signatureVersion: "v4",
        region: "us-east-1",
      });
      const bucketUrl =
        process.env.NODE_ENV === "production"
          ? "pictures-upload.relica.world"
          : "pictures-upload.dev.relica.world";
      function generatePutUrl() {
        return new Promise((resolve, reject) => {
          const params = {
            Bucket: bucketUrl,
            Key: `${pictureId}`,
            ContentType: imageType,
            Expires: 120,
          };
          s3.getSignedUrl("putObject", params, function (err, url) {
            if (err) {
              console.error(err);
              reject({ error: err });
            }
            resolve({ url });
          });
        });
      }
      const response = await generatePutUrl();
      if (response.error) {
        reply.send(406).send({ error: response.error });
      } else {
        const { url } = response;
        reply.send(JSON.stringify({ url }));
      }
    },
  });
};
