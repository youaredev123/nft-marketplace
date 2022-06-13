let blockChainServiceBaseURL = "https://blockchain.dev.relica.world";
let userServicebaseURL = "https://user.dev.relica.world";
let contentServiceBaseURL = "https://content.dev.relica.world";
let relicServiceBaseURL = "https://relic.dev.relica.world";

if (process.env.NODE_ENV === "production") {
  blockChainServiceBaseURL = "https://blockchain.relica.world";
  userServicebaseURL = "https://user.relica.world";
  contentServiceBaseURL = "https://content.relica.world";
  relicServiceBaseURL = "https://relic.relica.world";
}

const serviceMap = new Map();
serviceMap.set("user", userServicebaseURL);
serviceMap.set("blockchain", blockChainServiceBaseURL);
serviceMap.set("content", contentServiceBaseURL);
serviceMap.set("relic", relicServiceBaseURL);

module.exports =  { serviceMap }
