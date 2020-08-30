"use strict";

/**
* Module dependencies.
*/
let logger = require('util');
let configurationFileName = "../../config/test.conf.json";
let sdk = require('../SDK.js');

sdk.utils.getConfigurationFileName(process,configurationFileName);
let config = require(configurationFileName);

/**
* Init AdminApi .
*/
const api = new sdk.AdminApi({
    url: config.publicOpenIdConnectAdminServerRoutePath ,  //'http://oidc-admin-qf.itn.ftgroup:9081',
    consumerLogin: config.publicOpenIdConnectAdminServerLogin ,
    consumerPassword: config.publicOpenIdConnectAdminServerPassword ,
});