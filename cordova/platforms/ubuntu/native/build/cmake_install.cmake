# Install script for directory: /home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/build

# Set the install prefix
IF(NOT DEFINED CMAKE_INSTALL_PREFIX)
  SET(CMAKE_INSTALL_PREFIX "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix")
ENDIF(NOT DEFINED CMAKE_INSTALL_PREFIX)
STRING(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
IF(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  IF(BUILD_TYPE)
    STRING(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  ELSE(BUILD_TYPE)
    SET(CMAKE_INSTALL_CONFIG_NAME "Release")
  ENDIF(BUILD_TYPE)
  MESSAGE(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
ENDIF(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)

# Set the component getting installed.
IF(NOT CMAKE_INSTALL_COMPONENT)
  IF(COMPONENT)
    MESSAGE(STATUS "Install component: \"${COMPONENT}\"")
    SET(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  ELSE(COMPONENT)
    SET(CMAKE_INSTALL_COMPONENT)
  ENDIF(COMPONENT)
ENDIF(NOT CMAKE_INSTALL_COMPONENT)

# Install shared libraries without execute permission?
IF(NOT DEFINED CMAKE_INSTALL_SO_NO_EXE)
  SET(CMAKE_INSTALL_SO_NO_EXE "1")
ENDIF(NOT DEFINED CMAKE_INSTALL_SO_NO_EXE)

IF(NOT CMAKE_INSTALL_COMPONENT OR "${CMAKE_INSTALL_COMPONENT}" STREQUAL "Unspecified")
  IF(EXISTS "$ENV{DESTDIR}/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/cordova-ubuntu" AND
     NOT IS_SYMLINK "$ENV{DESTDIR}/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/cordova-ubuntu")
    FILE(RPATH_CHECK
         FILE "$ENV{DESTDIR}/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/cordova-ubuntu"
         RPATH "")
  ENDIF()
  list(APPEND CMAKE_ABSOLUTE_DESTINATION_FILES
   "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/cordova-ubuntu")
  IF (CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(WARNING "ABSOLUTE path INSTALL DESTINATION : ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  ENDIF (CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
  IF (CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(FATAL_ERROR "ABSOLUTE path INSTALL DESTINATION forbidden (by caller): ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  ENDIF (CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
FILE(INSTALL DESTINATION "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix" TYPE EXECUTABLE FILES "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/build/cordova-ubuntu")
  IF(EXISTS "$ENV{DESTDIR}/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/cordova-ubuntu" AND
     NOT IS_SYMLINK "$ENV{DESTDIR}/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/cordova-ubuntu")
    FILE(RPATH_REMOVE
         FILE "$ENV{DESTDIR}/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/cordova-ubuntu")
    IF(CMAKE_INSTALL_DO_STRIP)
      EXECUTE_PROCESS(COMMAND "/usr/bin/strip" "$ENV{DESTDIR}/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/cordova-ubuntu")
    ENDIF(CMAKE_INSTALL_DO_STRIP)
  ENDIF()
ENDIF(NOT CMAKE_INSTALL_COMPONENT OR "${CMAKE_INSTALL_COMPONENT}" STREQUAL "Unspecified")

IF(NOT CMAKE_INSTALL_COMPONENT OR "${CMAKE_INSTALL_COMPONENT}" STREQUAL "Unspecified")
  IF(EXISTS "$ENV{DESTDIR}/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/www/libcoreplugins.so" AND
     NOT IS_SYMLINK "$ENV{DESTDIR}/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/www/libcoreplugins.so")
    FILE(RPATH_CHECK
         FILE "$ENV{DESTDIR}/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/www/libcoreplugins.so"
         RPATH "")
  ENDIF()
  list(APPEND CMAKE_ABSOLUTE_DESTINATION_FILES
   "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/www/libcoreplugins.so")
  IF (CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(WARNING "ABSOLUTE path INSTALL DESTINATION : ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  ENDIF (CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
  IF (CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(FATAL_ERROR "ABSOLUTE path INSTALL DESTINATION forbidden (by caller): ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  ENDIF (CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
FILE(INSTALL DESTINATION "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/www" TYPE SHARED_LIBRARY FILES "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/build/libcoreplugins.so")
  IF(EXISTS "$ENV{DESTDIR}/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/www/libcoreplugins.so" AND
     NOT IS_SYMLINK "$ENV{DESTDIR}/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/www/libcoreplugins.so")
    FILE(RPATH_REMOVE
         FILE "$ENV{DESTDIR}/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/www/libcoreplugins.so")
    IF(CMAKE_INSTALL_DO_STRIP)
      EXECUTE_PROCESS(COMMAND "/usr/bin/strip" "$ENV{DESTDIR}/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/www/libcoreplugins.so")
    ENDIF(CMAKE_INSTALL_DO_STRIP)
  ENDIF()
ENDIF(NOT CMAKE_INSTALL_COMPONENT OR "${CMAKE_INSTALL_COMPONENT}" STREQUAL "Unspecified")

IF(NOT CMAKE_INSTALL_COMPONENT OR "${CMAKE_INSTALL_COMPONENT}" STREQUAL "Unspecified")
  list(APPEND CMAKE_ABSOLUTE_DESTINATION_FILES
   "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/www/cordova.js")
  IF (CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(WARNING "ABSOLUTE path INSTALL DESTINATION : ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  ENDIF (CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
  IF (CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(FATAL_ERROR "ABSOLUTE path INSTALL DESTINATION forbidden (by caller): ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  ENDIF (CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
FILE(INSTALL DESTINATION "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/www" TYPE FILE FILES "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/build/www/cordova.js")
ENDIF(NOT CMAKE_INSTALL_COMPONENT OR "${CMAKE_INSTALL_COMPONENT}" STREQUAL "Unspecified")

IF(NOT CMAKE_INSTALL_COMPONENT OR "${CMAKE_INSTALL_COMPONENT}" STREQUAL "Unspecified")
  list(APPEND CMAKE_ABSOLUTE_DESTINATION_FILES
   "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/qml")
  IF (CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(WARNING "ABSOLUTE path INSTALL DESTINATION : ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  ENDIF (CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
  IF (CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(FATAL_ERROR "ABSOLUTE path INSTALL DESTINATION forbidden (by caller): ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  ENDIF (CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
FILE(INSTALL DESTINATION "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix" TYPE DIRECTORY FILES "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/build/qml")
ENDIF(NOT CMAKE_INSTALL_COMPONENT OR "${CMAKE_INSTALL_COMPONENT}" STREQUAL "Unspecified")

IF(NOT CMAKE_INSTALL_COMPONENT OR "${CMAKE_INSTALL_COMPONENT}" STREQUAL "Unspecified")
  list(APPEND CMAKE_ABSOLUTE_DESTINATION_FILES
   "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix/CordovaUbuntu.4.0")
  IF (CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(WARNING "ABSOLUTE path INSTALL DESTINATION : ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  ENDIF (CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
  IF (CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(FATAL_ERROR "ABSOLUTE path INSTALL DESTINATION forbidden (by caller): ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  ENDIF (CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
FILE(INSTALL DESTINATION "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/prefix" TYPE DIRECTORY FILES "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/build/CordovaUbuntu.4.0")
ENDIF(NOT CMAKE_INSTALL_COMPONENT OR "${CMAKE_INSTALL_COMPONENT}" STREQUAL "Unspecified")

IF(CMAKE_INSTALL_COMPONENT)
  SET(CMAKE_INSTALL_MANIFEST "install_manifest_${CMAKE_INSTALL_COMPONENT}.txt")
ELSE(CMAKE_INSTALL_COMPONENT)
  SET(CMAKE_INSTALL_MANIFEST "install_manifest.txt")
ENDIF(CMAKE_INSTALL_COMPONENT)

FILE(WRITE "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/build/${CMAKE_INSTALL_MANIFEST}" "")
FOREACH(file ${CMAKE_INSTALL_MANIFEST_FILES})
  FILE(APPEND "/home/duke/src/uhura-dashboard/cordova/platforms/ubuntu/native/build/${CMAKE_INSTALL_MANIFEST}" "${file}\n")
ENDFOREACH(file)
