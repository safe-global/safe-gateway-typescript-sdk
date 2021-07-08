"use strict";
exports.__esModule = true;
exports.getTransactionDetails = exports.getCollectibles = exports.getBalances = exports.getSafeInfo = exports.setNetwork = void 0;
var utils_1 = require("./utils");
var network = 'rinkeby';
function setNetwork(newNetwork) {
    network = newNetwork;
}
exports.setNetwork = setNetwork;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function getSafeInfo(address) {
    return utils_1.callEndpoint(network, '/safes/{address}/', { path: { address: address } });
}
exports.getSafeInfo = getSafeInfo;
function getBalances(address, currency, query) {
    if (currency === void 0) { currency = 'usd'; }
    return utils_1.callEndpoint(network, '/safes/{address}/balances/{currency}/', { path: { address: address, currency: currency }, query: query });
}
exports.getBalances = getBalances;
function getCollectibles(address, query) {
    return utils_1.callEndpoint(network, '/safes/{address}/collectibles/', { path: { address: address }, query: query });
}
exports.getCollectibles = getCollectibles;
function getTransactionDetails(safe_tx_hash) {
    return utils_1.callEndpoint(network, '/transactions/{safe_tx_hash}/', { path: { safe_tx_hash: safe_tx_hash } });
}
exports.getTransactionDetails = getTransactionDetails;
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
