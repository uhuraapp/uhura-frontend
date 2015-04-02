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


cmake_minimum_required(VERSION 2.8.8)

project(cordova-ubuntu-tests)

set(CMAKE_INCLUDE_CURRENT_DIR ON)
set(CMAKE_AUTOMOC ON)

SET(CMAKE_CXX_FLAGS "-std=c++11 -fno-omit-frame-pointer -Wall -Wextra")

enable_testing()

find_package(GTest REQUIRED)
find_package(Qt5Widgets)
find_package(Qt5Core)

include_directories(${GTEST_INCLUDE_DIR})

add_subdirectory(../ cordova_ubuntu)

add_executable(main
    main.cpp
)
qt5_use_modules(main Quick Xml Widgets Core)
target_link_libraries(main gtest pthread coreplugins cordovaubuntuplugin)

add_test(Main main)
