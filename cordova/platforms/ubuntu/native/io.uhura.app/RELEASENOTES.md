<!--
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#  KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#
-->
## Release Notes for Cordova Ubuntu ##

### 4.0.0 ###

* port to oxide
* implement uri whitelist
* set ubuntu-sdk-14.10 as default framework
* ubuntu 14.10 support
* code cleanups

### 3.6.0 ###

* Set VERSION to 3.6.0 (via coho)
* Update JS snapshot to version 3.6.0 (via coho)
* added missing licenses
* bin/create: create www
* switch to incremental build
* set policy_version in apparmor.json based on framework version
* remove -flto from compiler flags
* change default to ubuntu-sdk-14.04
* plugin could specify additional build dependency
* use different compiler flags for debug/release build
* fix build problem with ubuntu-sdk-14.04
* bin/build/build: integrate with click-reviewers-tools
* bin/build/build: check chroot env before build
* bin/build/[build,run] add --framework option
* add emulator support
* add support for non-arm based Ubuntu Touch devices
* CordovaViewInternal: add overrideScheme
* cplugin: add onAppLoaded
* CB-6818 Add license for CONTRIBUTING.md
* Update JS snapshot to version 3.6.0-dev (via coho)
* Set VERSION to 3.6.0-dev (via coho)
