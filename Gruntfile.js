"use strict";

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    "babel": {
      "options": {
        "sourceMap": true,
        "presets": ["babel-preset-es2015"]
      },
      "dist": {
        "files": [{
          "expand": true,
          "cwd": "lib/",
          "src": ["**/*.es6"],
          "dest": "dist/",
          "ext": ".js"
        }, {
          "expand": true,
          "cwd": "test/lib/",
          "src": ["**/*.spec.es6"],
          "dest": "test/dist/",
          "ext": ".spec.js"
        }, {
          "expand": true,
          "cwd": "test/lib/",
          "src": ["**/*.es6"],
          "dest": "test/dist/",
          "ext": ".js"
        }]
      }
    },
    "clean": [
      "dist/",
      "test/dist"
    ],
    "eslint": {
      "target": ["lib/**/*.es6", "test/lib/**/*.es6", "Gruntfile.js"],
      "options": {
        "configFile": ".eslintrc"
      }
    },
    "mochaTest": {
      "test": {
        "options": {
          "reporter": "spec",
          "captureFile": "test_results.txt",
          "quiet": false,
          "timeout": 2000
        },
        "src": ["test/dist/**/*.spec.js"]
      }
    },
    "watch": {
      "es6": {
        "files": ["lib/**/*.es6"],
        "tasks": ["babel:dist"]
      }
    },
    "jscs": {
      "src": "{<%= eslint.target %>}",
      "options": {
        "config": true,
        "esnext": true,
        "verbose": true,
        "fileExtensions": [".es6", ".js"]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  // grunt.loadNpmTasks("grunt-mocha-test");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-jscs");

  // Default task.
  grunt.registerTask("default", [
    "buildCommon"
    // "testCommon"
  ]);

  // Common build task
  grunt.registerTask("buildCommon", [
    "clean",
    "babel",
    "eslint",
    "jscs"
  ]);

  // Common test task
  grunt.registerTask("testCommon", [
    "mochaTest:test"
  ]);
};
