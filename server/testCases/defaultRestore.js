/**
* Orange OpenID Connect Server
*
* Copyright (C) 2019 - 2020 Orange
*
* This software is confidential and proprietary information of Orange.
* You shall not disclose such Confidential Information and shall use it only in
* accordance with the terms of the agreement you entered into.
* Unauthorized copying of this file, via any medium is strictly prohibited.
*
* If you are Orange employee you shall use this software in accordance with
* the Orange Source Charter (http://opensource.itn.ftgroup/index.php/Orange_Source).
*
*@author authorName authorName@sofrecom.com 
*
**/

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

