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

var fs = require('fs');
var et = require('elementtree');

var XML = et.XML;
var ElementTree = et.ElementTree;
var element = et.Element;
var subElement = et.SubElement;

function getNodeTextSafe(el) {
    return el && el.text && el.text.trim();
}

function getNodeAttrSafe(el, attr) {
    return el && el.attrib[attr];
}

function Config(path) {
    var data = fs.readFileSync(path).toString();
    this.etree = et.parse(data);
}

Config.prototype = {
    id: function() {
        return getNodeAttrSafe(this.etree.getroot(), 'id');
    },
    version: function() {
        return getNodeAttrSafe(this.etree.getroot(), 'version');
    },
    name: function() {
        return getNodeTextSafe(this.etree.find('name'));
    },
    author: function() {
        return getNodeTextSafe(this.etree.find('author'));
    },
    email: function() {
        return getNodeAttrSafe(this.etree.find('author'), 'email');
    },
    description: function() {
        return getNodeTextSafe(this.etree.find('description'));
    },
    icon: function() {
        return getNodeAttrSafe(this.etree.find('icon'), 'src');
    }
};

module.exports = Config;
