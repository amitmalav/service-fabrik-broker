'use strict';

const CloudControllerClient = require('./CloudControllerClient');
const UaaClient = require('./UaaClient');
const TokenIssuer = require('./TokenIssuer');
const TokenInfo = require('./TokenInfo');
const ResourceStream = require('./ResourceStream');
const ServiceFabrikClient = require('./ServiceFabrikClient');
const uaa = new UaaClient();
const tokenIssuer = new TokenIssuer(exports.uaa);
const serviceFabrikClient = new ServiceFabrikClient(tokenIssuer);
const cloudController = new CloudControllerClient(tokenIssuer);

module.exports = {
  uaa,
  tokenIssuer,
  serviceFabrikClient,
  cloudController,
  TokenInfo,
  ResourceStream
}
