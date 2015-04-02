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

project(cordova-ubuntu)

set(CMAKE_INCLUDE_CURRENT_DIR ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${PROJECT_SOURCE_DIR}")

file (STRINGS "VERSION" CORDOVA_VERSION)
STRING(REGEX MATCH "^[0-9]+\\.[0-9]+" VERSION ${CORDOVA_VERSION})
STRING(REGEX MATCH "^[0-9]+" MAJOR_VERSION ${VERSION})
STRING(REGEX MATCH "[0-9]+$" MINOR_VERSION ${VERSION})

configure_file (
  "${PROJECT_SOURCE_DIR}/qml/main.qml.in"
  "${PROJECT_BINARY_DIR}/main.qml"
)
configure_file (
  "${PROJECT_SOURCE_DIR}/qml/CordovaView.qml.in"
  "${PROJECT_BINARY_DIR}/CordovaView.qml"
)

SET(CMAKE_CXX_FLAGS "-std=c++11 -fno-omit-frame-pointer -Wall -Wextra -DCORDOVA_UBUNTU_VERSION=\\\"${CORDOVA_VERSION}\\\" -DCORDOVA_UBUNTU_MAJOR_VERSION=${MAJOR_VERSION} -DCORDOVA_UBUNTU_MINOR_VERSION=${MINOR_VERSION} -I ${PROJECT_SOURCE_DIR}/src")

if(UBUNTU_TOUCH STREQUAL "1")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DUBUNTU_TOUCH")
endif()

if(CMAKE_BUILD_TYPE STREQUAL "Release")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Os")
endif()
if(CMAKE_BUILD_TYPE STREQUAL "Debug")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O1 -g")
endif()

add_custom_command(OUTPUT ${PROJECT_BINARY_DIR}/qml
  COMMAND mkdir -p ${PROJECT_BINARY_DIR}/qml
  COMMAND ${CMAKE_COMMAND} -E copy ${PROJECT_BINARY_DIR}/main.qml ${PROJECT_BINARY_DIR}/qml
  DEPENDS ${PROJECT_BINARY_DIR}/main.qml
)

file(GLOB tmp CordovaUbuntu/*)
add_custom_command(
  OUTPUT ${PROJECT_BINARY_DIR}/CordovaUbuntu.${VERSION}
  COMMAND ${CMAKE_COMMAND} -E copy_directory ${PROJECT_SOURCE_DIR}/CordovaUbuntu ${PROJECT_BINARY_DIR}/CordovaUbuntu.${VERSION}
  COMMAND ${CMAKE_COMMAND} -E copy ${PROJECT_BINARY_DIR}/libcordovaubuntuplugin.so ${PROJECT_BINARY_DIR}/CordovaUbuntu.${VERSION}
  COMMAND ${CMAKE_COMMAND} -E copy ${PROJECT_BINARY_DIR}/CordovaView.qml ${PROJECT_BINARY_DIR}/CordovaUbuntu.${VERSION}
  DEPENDS ${tmp} cordovaubuntuplugin ${PROJECT_BINARY_DIR}/CordovaView.qml
)
file(GLOB tmp xml/*)
add_custom_command(
  OUTPUT ${PROJECT_BINARY_DIR}/xml
  COMMAND ${CMAKE_COMMAND} -E copy_directory ${PROJECT_SOURCE_DIR}/xml ${PROJECT_BINARY_DIR}/xml
  DEPENDS ${tmp} ${PROJECT_SOURCE_DIR}/xml
)
add_custom_target(copy_wwwqmlxml DEPENDS ${PROJECT_BINARY_DIR}/CordovaUbuntu.${VERSION} ${PROJECT_BINARY_DIR}/xml ${PROJECT_BINARY_DIR}/qml)

find_package(Qt5Widgets)
find_package(Qt5Core)
find_package(PkgConfig)

pkg_check_modules(PLUGIN_DEPS REQUIRED ${ADDITIONAL_DEPENDECIES})

include_directories(${PLUGIN_DEPS_INCLUDE_DIRS})
link_directories(${PLUGIN_DEPS_LIBRARY_DIRS})

add_executable(cordova-ubuntu
  main.cpp
)
qt5_use_modules(cordova-ubuntu Widgets Quick Xml)
add_dependencies(cordova-ubuntu copy_wwwqmlxml)

ADD_LIBRARY(cordovaubuntuplugin SHARED
  src/cplugin.cpp
  src/cordova.cpp
  src/qmlplugin.cpp
  src/cordova_whitelist.cpp
  src/cordova_config.cpp

  src/cordova.h
  src/cplugin.h
  src/qmlplugin.h
  src/cordova_whitelist.hpp
  src/cordova_config.hpp
)
qt5_use_modules(cordovaubuntuplugin Widgets Quick Xml)

#TODO use subprojects
file(GLOB_RECURSE PLUGIN_SOURCES src/plugins/*.cpp)
file(GLOB_RECURSE PLUGIN_HEADERS src/plugins/*.h)

ADD_LIBRARY(coreplugins SHARED
  src/coreplugins.cpp

  ${PLUGIN_SOURCES}
  ${PLUGIN_HEADERS}
)
qt5_use_modules(coreplugins Widgets Location Sensors Feedback SystemInfo Contacts Multimedia Quick MultimediaWidgets)

target_link_libraries(cordova-ubuntu cordovaubuntuplugin)
target_link_libraries(coreplugins cordovaubuntuplugin ${PLUGIN_DEPS_LIBRARIES})

install (TARGETS cordova-ubuntu DESTINATION ${CMAKE_INSTALL_PREFIX})
install (TARGETS coreplugins DESTINATION ${CMAKE_INSTALL_PREFIX}/www)
install (FILES ${PROJECT_SOURCE_DIR}/www/cordova.js DESTINATION ${CMAKE_INSTALL_PREFIX}/www/)
install (DIRECTORY ${PROJECT_BINARY_DIR}/qml DESTINATION ${CMAKE_INSTALL_PREFIX})
install (DIRECTORY ${PROJECT_BINARY_DIR}/CordovaUbuntu.${VERSION} DESTINATION ${CMAKE_INSTALL_PREFIX})
