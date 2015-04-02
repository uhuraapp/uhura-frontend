#!/usr/bin/env node

/*
 *
 * Copyright 2014 Canonical Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var assert = require('assert');
var Utils = require('./utils');

var logger = require('./logger');

module.exports.list = function () {
    logger.info('Searching for connected devices');

    var res = Utils.execSync('adb devices', false);
    var response = res.output.split('\n');
    var deviceList = [];

    for (var i = 1; i < response.length; i++) {
        if (response[i].match(/\w+\tdevice/)) {
            deviceList.push(response[i].replace(/\tdevice/, '').replace('\r', ''));
        }
    }

    return deviceList;
};

module.exports.isAttached = function (target) {
    var res = adbExec(target, 'get-state');

    if (res.output.indexOf('device') == -1)
        return false;

    res = adbExec(target, 'shell uname -a');
    if (res.output.indexOf('ubuntu-phablet') == -1)
        return false;

    return true;
};

module.exports.arch = function (target) {
    var out = adbExec(target, 'shell "dpkg --print-architecture 2>/dev/null"').output.split('\r\n');

    assert.ok(out.length == 2 && out[0].indexOf(' ') == -1);

    return out[0];
};

function adbExec(target, command, options) {
    assert.ok(target && command);
    options = options || {};
    return Utils.execSync('adb -s ' + target + ' ' + command, options.silent);
}

function adbExecAsync(target, command, options) {
    assert.ok(target && command);
    options = options || {};
    return Utils.execAsync('adb -s ' + target + ' ' + command, options.silent);
}

module.exports.adbExec = adbExec;
module.exports.adbExecAsync = adbExecAsync;
