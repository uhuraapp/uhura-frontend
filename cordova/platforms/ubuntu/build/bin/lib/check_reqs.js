#!/usr/bin/env node

/*
 *
 * Copyright 2013, 2014 Canonical Ltd.    
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

var exec = require('child_process').exec;

var DEPENDENCIES = [
    'click',
    'cmake', 
    'libicu-dev', 
    'pkg-config', 
    'devscripts', 
    'qtbase5-dev', 
    'qtchooser', 
    'qtdeclarative5-dev', 
    'qtfeedback5-dev', 
    'qtlocation5-dev', 
    'qtmultimedia5-dev', 
    'qtpim5-dev', 
    'libqt5sensors5-dev', 
    'qtsystems5-dev'
];

exports.check_reqs = function (callback) {
    if (!checkNodeDependencies()) {
        installNodeDependencies(checkUbuntuDependencies.bind(null, callback));
    } else {
        checkUbuntuDependencies(callback);
    }
};

function checkUbuntuDependencies(callback) {
    var deps = DEPENDENCIES.join(' ');
    exec("dpkg-query -Wf'${db:Status-abbrev}\\n'" + deps, function (error, stdout, stderr) {
        if (error !== null) {
            console.error('Error: missing dependency ' + deps);
            process.exit(1);
        }
        callback();
    });
}

function checkNodeDependencies() {
    try {
        require.resolve("shelljs");
        require.resolve("colors");
        require.resolve("optimist");
        require.resolve("q");
    } catch(e) {
        // One or more dependencies are missing, need installation.
        return false;
    }

    return true;
}

function installNodeDependencies(callback) {
    var block = true;
    exec('npm install', {cwd: __dirname}, function (error, stdout, stderr) {
        block = false;
        if (error !== null) {
            console.error('ERROR : running \'npm install\' is npm installed? ' + error);
            console.error(stderr);
            process.exit(error.code);
        }
    });
    function wait() {
        if (block) {
            setTimeout(wait, 1500);
        } else {
            callback();
        }
    };
    setTimeout(wait, 1500);
}
