"use strict";
exports.__esModule = true;
exports.callEndpoint = void 0;
var unfetch_1 = require("unfetch");
var config_1 = require("./config");
function replaceParam(str, key, value) {
    return str.replace(new RegExp("\\{" + key + "\\}", 'g'), value);
}
function fetchJson(url) {
    return unfetch_1["default"](url).then(function (resp) {
        if (!resp.ok) {
            throw Error(resp.statusText);
        }
        return resp.json();
    });
}
function stringifyQuery(query) {
    var searchParams = new URLSearchParams();
    Object.keys(query).forEach(function (key) {
        searchParams.append(key, String(query[key]));
    });
    return "?" + searchParams;
}
function callEndpoint(network, path, params) {
    var baseUrl = replaceParam(config_1["default"].baseUrl, 'network', network);
    var pathname = Object.keys(params.path).reduce(function (result, key) {
        return replaceParam(result, key, params.path[key]);
    }, path);
    var search = '';
    var query = params.query; // any because not all endpoints have a query
    if (query) {
        search = stringifyQuery(query);
    }
    var url = "" + baseUrl + pathname + search;
    return fetchJson(url);
}
exports.callEndpoint = callEndpoint;
