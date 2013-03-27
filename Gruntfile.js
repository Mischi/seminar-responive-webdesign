'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
     grunt.initConfig({
        clean: {
          dev: ['css']
        },

        compass: {
          dev: {
            config: 'config.rb'
          }
        },

        connect: {
          livereload: {
            options: {
              port: 9001,
              middleware: function(connect, options) {
                return [lrSnippet, folderMount(connect, options.base)]
              }
            }
          }
        },

        regarde: {
            fred: {
                files: ['index.html', 'sass/*.scss', 'images/*'],
                tasks: ['compass:dev', 'livereload']
            }
        }
    });

    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
    grunt.registerTask('build', ['clean', 'compass']);
};
