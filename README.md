# Relica

NPM was used in the root so both projects could be installed & started easily.

To begin, start in the root folder and execute the following commands.

**Relica is compatible with Node.js 12**
```
$ brew install node@12
```

For development (/develop branch)

```sh
$ npm install # installs for both the server and client
$ npm run dev # if you want to start the application for development execute this command
```

For production (WARNING - use carefully - this will connect to prod API's)

```sh
$ npm start # if you want to start the application for development execute this command
```

#### Client

To build the client:

```sh
$ npm run build
```

The above will output a /build folder.

### Running locally

In order to make one-click payments work:

a) edit your hosts file (/etc/hosts on Linux, %WINDIR%\System32\drivers\etc\hosts on Windows, /private/etc/hosts on macOS): add the following record to it:
127.0.0.1 dev.relica.world
**-** so now, all of your requests to dev.relica.world will be redirected to your own PC (note that the real dev server will be unaccessible to you).

b) edit `start:pwa` entry in the root package.json file and do not commit this in future:
if you have non-Windows: "start:pwa": "cd memento.pwa && HTTPS=true HOST=dev.relica.world npm start",
if you have Windows:
"start:pwa": "cd memento.pwa && cmd /c \"SET HTTPS=true&SET HOST=dev.relica.world&npm start\"",

c) now launch the app as usual ("npm start" from the root directory). If your browser is complaining that the SSL certificate is self-signed - ignore this. OPTIONAL: if the browser becomes too annoying in reminding you that the SSL certificate is self-signed - you can take that SSL certificate from "memento.pwa/node_modules/webpack-dev-server/ssl/server.pem" and add it to trusted root certificates in your operating system (however, I don't know what OS you use, so that's up to you - it's not required, it's just to make you dev experience easier).

d) If you login using money button, it will redirect you to:
https://dev.relica.world/app/moneybutton/return?code=abc&state=xyz

To by pass this step, please add port 3000 after your domain. In this case it should be:
https://dev.relica.world:3000/app/moneybutton/return?code=abc&state=xyz
