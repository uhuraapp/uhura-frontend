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
var check_reqs = require('./check_reqs').check_reqs;

var ROOT = path.join(__dirname, '..', '..');

exports.createProject = function(projectPath, packageName, projectName) {
    if (fs.existsSync(projectPath)) {
        console.error('Project already exists! Delete and recreate');
        process.exit(1);
    }

    console.log('Creating a Cordova Project:\n', 
        'Project Path: ' + projectPath + '\n',
        'Package Name: ' + packageName + '\n',
        'Project Name: ' + projectName + '\n'
        );

    shell.mkdir(projectPath);

    shell.cp('-r', path.join(ROOT, '*'), path.join(projectPath, 'build'));

    shell.mkdir(path.join(projectPath, 'native'));

    // Copy the necessary node_modules for building and running the project.
    shell.cp('-r', path.join(ROOT, 'node_modules'), path.join(projectPath, 'cordova'));

    // Checking requirements task needs to be copied as well.
    shell.cp('-r', path.join(ROOT, 'bin/check_reqs'), path.join(projectPath, 'cordova'));
    shell.cp('-r', path.join(ROOT, 'bin', 'lib', 'check_reqs.js'), path.join(projectPath, 'cordova', 'lib'));

    // Copy the default template including the defaults.xml for the Ubuntu platform.
    shell.cp('-r', path.join(ROOT, 'bin', 'templates', 'project', 'cordova'), projectPath);

    shell.mkdir(path.join(projectPath, 'www'));
    shell.cp(path.join(ROOT, 'www', 'cordova.js'), path.join(projectPath, 'www'));

    shell.cp('-r', path.join(ROOT, 'xml/config.xml'), projectPath);
} 


