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
var Q = require('q');
var colors = require('colors');
var shell = require('shelljs');

var config = require('./config');
var logger = require('./logger');

module.exports.cp = function(source, dest) {
    var cmd = 'cp -Rf ' + source + ' ' + dest;
    logger.debug(cmd);

    if (shell.cp('-r', source, dest) === null) {
        logger.error(cmd + " FAILED".underline);
        process.exit(1);
    }
};

module.exports.pushd = function(dir) {
    logger.debug('pushd ' + dir);
    shell.pushd(dir);
};

module.exports.popd = function(dir) {
    logger.debug('popd');
    shell.popd();
};

module.exports.execSync = function(cmd, silent) {
    logger.debug(cmd);

    silent = (typeof silent === 'boolean') ? silent : !config.inVerboseMode();
    var res = shell.exec(cmd, { silent: silent });
    if (res.code !== 0) {
        logger.error(cmd.green + " " + "FAILED".underline);
        logger.error(res.output);

        if (!config.inVerboseMode()) {
            logger.warn('Try running the task again with --verbose for more logs.');
            logger.warn('Example: cordova run -- --verbose');
        }

        process.exit(1);
    }

    return res;
};

module.exports.execAsync = function (cmd, silent) {
    logger.debug(cmd);

    var deferred = Q.defer();
    silent = (typeof silent === 'boolean') ? silent : !config.inVerboseMode();
    shell.exec(cmd, { async: true, silent: silent }, function (code, output) {
        var res = { code: code, output: output };
        if (res.code !== 0) {
            logger.error(cmd.green + " " + "FAILED".underline);
            logger.error(res.output);

            if (!config.inVerboseMode()) {
                logger.warn('Try running the task again with --verbose for more logs.');
                logger.warn('Example: cordova run -- --verbose');
            }

            process.exit(1);
        }
        deferred.resolve(res);
    });

    return deferred.promise;
};
