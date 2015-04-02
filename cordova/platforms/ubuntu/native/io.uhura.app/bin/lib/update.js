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

var shell = require('shelljs');
var path = require('path');
var fs = require('fs');

var ROOT = path.join(__dirname, '..', '..');

exports.updateProject = function(projectPath) {
    if (!fs.existsSync(projectPath)) {
        console.error('Project does not exist!');
        process.exit(1);
    }

    shell.rm('-r', path.join(projectPath, 'www'));
    shell.mkdir(path.join(projectPath, 'www'));
    shell.cp(path.join(ROOT, 'www', 'cordova.js'), path.join(projectPath, 'www'));

    shell.rm('-r', path.join(projectPath, 'cordova'));

    // Copy the necessary node modules.
    shell.cp('-r', path.join(ROOT, 'node_modules'), path.join(projectPath, 'cordova'));

    // Checking requirements needs to be copied as well.
    shell.cp('-r', path.join(ROOT, 'bin/check_reqs'), path.join(projectPath, 'cordova'));
    shell.cp('-r', path.join(ROOT, 'bin', 'lib', 'check_reqs.js'), path.join(projectPath, 'cordova', 'lib'));

    // Copy the default template including the defaults.xml for the Ubuntu platform.
    shell.cp('-r', path.join(ROOT, 'bin', 'templates', 'project', 'cordova'), projectPath);

    var tmp = path.join(projectPath, 'tmp');
    shell.mkdir(tmp);

    var pluginsDir = path.join(projectPath, 'build', 'src', 'plugins');
    var coreplugins = path.join(projectPath, 'build', 'src', 'coreplugins.cpp');
    shell.mv(coreplugins, tmp);
    shell.mv(pluginsDir, tmp);
    shell.rm('-r', path.join(projectPath, 'build'));

    shell.cp('-r', path.join(ROOT, '*'), path.join(projectPath, 'build'));

    shell.rm('-r', coreplugins);
    shell.rm('-r', pluginsDir);
    shell.mv(path.join(tmp, 'plugins'), path.join(projectPath, 'build', 'src'));
    shell.mv(path.join(tmp, 'coreplugins.cpp'), path.join(projectPath, 'build', 'src'));

    shell.rm('-r', tmp);
    console.log('project updated'.green);
}
