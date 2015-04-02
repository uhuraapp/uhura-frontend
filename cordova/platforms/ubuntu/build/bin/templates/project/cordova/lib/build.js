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
var colors = require('colors');
var fs = require('fs');
var os = require('os');
var Q = require('q');
var path = require('path');
var shell = require('shelljs');

var Constants = require('./constants');
var Utils = require('./utils');
var Manifest = require('./manifest');
var logger = require('./logger');

var PLATFORMS = Constants.PLATFORM_TYPES;

module.exports.build = function(rootDir, target, nobuild, architecture, framework, debug) {
    var ubuntuDir = path.join(rootDir, 'platforms', 'ubuntu');
    var campoDir = path.join(ubuntuDir, 'build');

    if (!architecture)
        architecture = Constants.DEFAULT_ARCH;
    if (!framework)
        framework = Constants.DEFAULT_FRAMEWORK;
    assert.ok(fs.existsSync(ubuntuDir));
    assert.ok(fs.existsSync(campoDir));

    if (target === PLATFORMS.PHONE)
        return buildClickPackage(campoDir, ubuntuDir, nobuild, architecture, framework, debug);
    if (target === PLATFORMS.DESKTOP)
        return buildNative(campoDir, ubuntuDir, nobuild, debug);
    if (target === PLATFORMS.ALL) {
        return buildClickPackage(campoDir, ubuntuDir, nobuild, architecture, framework, debug).then(function () {
            return buildNative(campoDir, ubuntuDir, nobuild);
        });
    }
};

function buildClickPackage(campoDir, ubuntuDir, nobuild, architecture, framework, debug) {
    logger.info('Building Phone Application...');

    assert.ok(architecture && architecture.match(/^[a-z0-9_]+$/));

    Manifest.generate(path.join(ubuntuDir, 'config.xml'), ubuntuDir);

    var archDir = path.join(ubuntuDir, framework, architecture);
    var prefixDir = path.join(archDir, 'prefix');

    if (!fs.existsSync(archDir))
        shell.mkdir('-p', archDir);

    if (nobuild && fs.existsSync(path.join(prefixDir, 'cordova-ubuntu'))) {
        return Q();
    }

    checkChrootEnv(ubuntuDir, architecture, framework);

    shell.rm('-rf', path.join(archDir, 'build'));

    shell.rm('-rf', prefixDir);
    shell.mkdir(path.join(archDir, 'build'));
    shell.mkdir(prefixDir);

    Utils.pushd(path.join(archDir, 'build'));

    var buildType = '"Debug"';
    if (!debug)
        buildType = '"Release"';

    var cmakeCmd = 'click chroot -a ' + architecture + ' -f ' + framework + ' run cmake ' + campoDir
              + ' -DCMAKE_INSTALL_PREFIX="' + prefixDir + '"' + ' -DCMAKE_BUILD_TYPE=' + buildType +' -DUBUNTU_TOUCH="1"';

    var deps = additionalBuildDependencies(ubuntuDir).join(' ').replace(/ARCH/g, architecture);
    if (deps.length)
        cmakeCmd += ' -DADDITIONAL_DEPENDECIES="' + deps + '"';

    return Utils.execAsync(cmakeCmd).then(function () {
        if (architecture != "i386")
            Utils.execSync('find . -name AutomocInfo.cmake | xargs sed -i \'s;AM_QT_MOC_EXECUTABLE .*;AM_QT_MOC_EXECUTABLE "/usr/lib/\'$(dpkg-architecture -qDEB_BUILD_MULTIARCH)\'/qt5/bin/moc");\'');
        return Utils.execAsync('click chroot -a ' + architecture + ' -f ' + framework + ' run make -j ' + cpuCount());
    }).then(function () {
        return Utils.execAsync('click chroot -a ' + architecture + ' -f ' + framework + ' run make install');
    }).then(function () {
        Utils.cp(path.join(ubuntuDir, 'www', '*'), path.join(prefixDir, 'www'));
        Utils.cp(path.join(ubuntuDir, 'qml', '*'), path.join(prefixDir, 'qml'));
        Utils.cp(path.join(ubuntuDir, 'cordova.desktop'), prefixDir);
        Utils.cp(path.join(ubuntuDir, 'config.xml'), prefixDir);

        var content = JSON.parse(fs.readFileSync(path.join(ubuntuDir, 'manifest.json'), {encoding: "utf8"}));
        content.architecture = architecture;
        content.framework = framework;
        fs.writeFileSync(path.join(prefixDir, 'manifest.json'), JSON.stringify(content));

        content = JSON.parse(fs.readFileSync(path.join(ubuntuDir, 'apparmor.json'), {encoding: "utf8"}));
        content.policy_version = 1.2;
        content.policy_groups.push('webview');
        fs.writeFileSync(path.join(prefixDir, 'apparmor.json'), JSON.stringify(content));

        Utils.pushd(prefixDir);

        return Utils.execAsync('click build .');
    }).then(function () {
        checkClickPackage(prefixDir);
        Utils.popd();

        Utils.popd();
    });
}

function buildNative(campoDir, ubuntuDir, nobuild, debug) {
    logger.info('Building Desktop Application...');

    var nativeDir = path.join(ubuntuDir, 'native');
    var prefixDir = path.join(nativeDir, 'prefix');

    if (nobuild && fs.existsSync(path.join(prefixDir, 'cordova-ubuntu'))) {
        return Q();
    }

    checkEnv(ubuntuDir);

    Manifest.generate(path.join(ubuntuDir, 'config.xml'), ubuntuDir);

    shell.rm('-rf', prefixDir);

    shell.mkdir('-p', path.join(nativeDir, 'build'));
    shell.mkdir(prefixDir);

    Utils.pushd(path.join(nativeDir, 'build'));

    var buildType = '"Debug"';
    if (!debug)
        buildType = '"Release"';

    var cmakeCmd = 'cmake ' + campoDir + ' -DCMAKE_INSTALL_PREFIX="' + prefixDir + '"'
        + ' -DCMAKE_BUILD_TYPE=' + buildType;

    var deps = additionalBuildDependencies(ubuntuDir).join(' ').replace(/ARCH/g, '');
    if (deps.length)
        cmakeCmd += ' -DADDITIONAL_DEPENDECIES="' + deps + '"';

    var debDir;
    return Utils.execAsync(cmakeCmd).then(function () {
        return Utils.execAsync('make -j ' + cpuCount() + '; make install');
    }).then(function () {
        Utils.cp(path.join(ubuntuDir, 'config.xml'), prefixDir);
        Utils.cp(path.join(ubuntuDir, 'www', '*'), path.join(prefixDir, 'www'));
        Utils.cp(path.join(ubuntuDir, 'qml', '*'), path.join(prefixDir, 'qml'));

        Utils.popd();

        var manifest = JSON.parse(fs.readFileSync(path.join(ubuntuDir, 'manifest.json'), {encoding: "utf8"}));

        assert(manifest.name.length);
        assert(manifest.name.indexOf(' ') == -1);

        debDir = path.join(nativeDir, manifest.name);

        shell.rm('-rf', debDir);

        shell.mkdir('-p', path.join(debDir, 'debian'));
        Utils.cp(path.join(campoDir, '*'), debDir);

        Utils.cp(path.join(ubuntuDir, 'config.xml'), path.join(debDir, 'debian'));
        Utils.cp(path.join(ubuntuDir, 'www', '*'), path.join(debDir, 'www'));
        Utils.cp(path.join(ubuntuDir, 'qml', '*'), path.join(debDir, 'qml'));

        var destDir = path.join('/opt', manifest.name);

        var icon = fs.readFileSync(path.join(ubuntuDir, 'cordova.desktop'), {encoding: "utf8"}).match(/^Icon=(.+)$/m);
        icon = icon ? '/opt/' + manifest.name + '/' + icon[1] : 'qmlscene';

        var maintainerEmail = manifest.maintainer.match('<.+>$');
        maintainerEmail = maintainerEmail?maintainerEmail[0]:'';
        var maintainerName = manifest.maintainer.replace(maintainerEmail, '').trim();
        maintainerEmail = maintainerEmail.replace('<', '').replace('>', '');

        var props = { PACKAGE_NAME: manifest.name,
                      PACKAGE_TITLE: manifest.title,
                      PACKAGE_VERSION: manifest.version,
                      MAINTAINER_NAME: maintainerName,
                      MAINTAINER_EMAIL: maintainerEmail,
                      PACKAGE_DESCRIPTION: manifest.description,
                      PACKAGE_ICON: icon };
        var templateDir = path.join(campoDir, 'bin', 'templates', 'project', 'misc');
        var templates = [{source: path.join(templateDir, 'changelog'), dest: path.join(debDir, 'debian', 'changelog')},
                         {source: path.join(templateDir, 'compat'), dest: path.join(debDir, 'debian', 'compat')},
                         {source: path.join(templateDir, 'control'), dest: path.join(debDir, 'debian', 'control')},
                         {source: path.join(templateDir, 'rules'), dest: path.join(debDir, 'debian', 'rules')},
                         {source: path.join(templateDir, 'cordova.desktop'), dest: path.join(debDir, 'debian', 'cordova.desktop')},
                         {source: path.join(templateDir, 'install'), dest: path.join(debDir, 'debian', manifest.name + '.install')}];
        for (var i = 0; i < templates.length; i++) {
            fillTemplate(templates[i].source, templates[i].dest, props);
        }
        logger.warn('In order to build debian package, execute: ');
        logger.warn('cd ' + debDir + '; ' + 'debuild');
    });
};

/**
*   Generates a file from a template source, injecting the values contained in the
*   provided js object.
*/
function fillTemplate(source, dest, obj) {
    var content = fs.readFileSync(source, {encoding: "utf8"});
    for (var prop in obj) {
        content = content.replace(new RegExp('{' + prop + '}', 'g'), obj[prop]);
    }

    fs.writeFileSync(dest, content);
}

function additionalBuildDependencies(ubuntuDir) {
    var files = [];
    try {
        files = fs.readdirSync(path.join(ubuntuDir, 'configs')).filter(function(s) {
            return s[0] != '.';
        });
    } catch (e) {}

    var pkgConfig = [];
    for (var i = 0; i < files.length; i++) {
        var config = JSON.parse(fs.readFileSync(path.join(ubuntuDir, 'configs', files[i])));
        if (config.pkgConfig)
            pkgConfig = pkgConfig.concat(config.pkgConfig);
    }

    return pkgConfig;
}

function checkClickPackage(prefixDir) {
    Utils.pushd(prefixDir);

    if (fs.existsSync('/usr/bin/click-run-checks')) {
        var cmd = '/usr/bin/click-run-checks *.click';
        logger.debug(cmd);
        var output = shell.exec(cmd, { silent: true }).output;
        var json = '[', b = 0;
        for (var i = 0; i < output.length; i++) {
            if (output[i] == '{') {
                if (json.length > 1 && !b)
                    json += ', ';
                b++;
            } else if (output[i] == '}') {
                b--;
                if (b == 0)
                    json += '} ';
            }
            if (b > 0) {
                json += output[i];
            }
        }
        json += ']';
        var out = JSON.parse(json);
        for (var i = 0; i < out.length; i++) {
            if (out[i].warn) {
                for (var m in out[i].warn) {
                    if (out[i].warn[m].text) {
                        logger.warn(out[i].warn[m].text);
                        if (out[i].warn[m].link)
                            logger.warn(out[i].warn[m].link);
                    }
                }
            }
        }
        for (var i = 0; i < out.length; i++) {
            if (out[i].error) {
                for (var m in out[i].error) {
                    if (out[i].error[m].text) {
                        logger.warn(out[i].error[m].text);
                        if (out[i].error[m].link)
                            logger.warn(out[i].error[m].link);
                    }
                }
            }
        }
    }

    Utils.popd();
}

function cpuCount() {
    return os.cpus().length;
}

function checkEnv(ubuntuDir) {
    var deps = additionalDependencies(ubuntuDir).join(' ');
    deps = deps.replace(/:ARCH/g, '');

    if (!deps.length)
        return;

    var cmd = "dpkg-query -Wf'${db:Status-abbrev}' " + deps;
    var res = Utils.execSync(cmd);
    if (res.code !== 0 || res.output.indexOf('un') !== -1) {
        logger.error("Error: missing packages" + deps);
        process.exit(1);
    }
}

function checkChrootEnv(ubuntuDir, architecture, framework) {
    var deps = "cmake libicu-dev:ARCH pkg-config qtbase5-dev:ARCH qtchooser qtdeclarative5-dev:ARCH qtfeedback5-dev:ARCH qtlocation5-dev:ARCH qtmultimedia5-dev:ARCH qtpim5-dev:ARCH libqt5sensors5-dev:ARCH qtsystems5-dev:ARCH ";
    deps += additionalDependencies(ubuntuDir).join(' ');
    deps = deps.replace(/ARCH/g, architecture);

    var cmd = "click chroot -a " + architecture + " -f " + framework + " run dpkg-query -Wf'${db:Status-abbrev}' " + deps;
    var res = shell.exec(cmd);
    if (res.code !== 0 || res.output.indexOf('un') !== -1) {
        logger.error("Error: missing " + architecture + " chroot");
        logger.error("run:\nsudo click chroot -a " + architecture + " -f " + framework + " create");
        logger.error("sudo click chroot -a " + architecture + " -f " + framework + " install " + deps);
        process.exit(1);
    }
}

function additionalDependencies(ubuntuDir) {
    var files = [];
    try {
        files = fs.readdirSync(path.join(ubuntuDir, 'configs')).filter(function(s) {
            return s[0] != '.';
        });
    } catch (e) {}
    var deb = [];
    for (var i = 0; i < files.length; i++) {
        var config = JSON.parse(fs.readFileSync(path.join(ubuntuDir, 'configs', files[i])));
        if (config.deb)
            deb = deb.concat(config.deb);
    }
    return deb;
}
