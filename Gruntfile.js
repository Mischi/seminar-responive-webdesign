﻿'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
     grunt.initConfig({
        clean: {
          dev: ['css'],
          dist: ['css', 'temp', 'dist']
        },

        copy: {
          dist: {
            files: [ 
              { src: 'index.html', dest: 'dist/' },
              { src: 'images/*', dest: 'dist/', filter: 'isFile' },
              { src: 'robots.txt', dest: 'dist/' },
              { src: 'presentation/**', dest: 'dist/'},
              { src: 'components/impress.js/js/impress.js', dest: 'dist/presentation/impress.js'},
              { src: 'components/impress.js/css/impress-demo.css', dest: 'dist/presentation/impress-demo.css'},
              { src: 'Seminararbeit-FabianRaetz.pdf', dest: 'dist/Seminararbeit-FabianRaetz.pdf'},
              { src: 'README.dist.md', dest: 'dist/README.md'}
            ]
          }
        },

        compass: {
          dev: {
              config: 'config.rb'
          },
          dist: {
            options: {
              config: 'config.rb',
              cssDir: 'dist/css',
              relativeAssets: true,
              environment: 'production'
            }
          }
        },

        uglify: {
          dist: {
            files: {
              'dist/site.min.js': [
                'js/matchMedia.js',
                'components/skrollr-stylesheets/dist/skrollr.stylesheets.min.js',
                'components/skrollr/dist/skrollr.min.js', 
                'components/skrollr/dist/skrollr.menu.min.js',
                'components/jquery/jquery.min.js',
                'components/jquery-waypoints/waypoints.min.js',
                'js/site.js'
              ]
            }
          }
        },

        htmlmin: {
          dist: {
            options: {
              removeComments: true,
              collapseWhitespace: true
            },
            files: {
              'dist/index.html': 'dist/index.html',
            }
          }
        },

        useminPrepare: {
            html: 'index.html',
            dest: 'dist/'
        },

        usemin: {
          html: ['dist/index.html', 'dist/presentation/index.html'],
          options: {
            dirs: ['dist']
          }
        },

        compress: {
          dist: {
            options: {
              archive: 'seminar-responseweb-fabianraetz.zip'
            },
            files: [
              {src: ['dist/**'], dest: ''}
            ]
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
          },
          webserver: {
            options: {
              port: 9002,
              base: 'dist',
              keepalive: true
            }
          }
        },

        regarde: {
            fred: {
                files: ['index.html', 'sass/**/*.scss', 'js/*.js', 'images/*'],
                tasks: ['compass:dev', 'livereload']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', ['package']);
    grunt.registerTask('watch', ['build:dev', 'livereload-start', 'connect:livereload', 'regarde']);
    grunt.registerTask('build:dev', ['clean:dev', 'compass:dev']);
    grunt.registerTask('build', ['clean:dist', 'compass:dist', 'uglify:dist', 'copy:dist', 'useminPrepare', 'usemin', 'htmlmin:dist']);
    grunt.registerTask('webserver', ['build', 'connect:webserver']);
    grunt.registerTask('package', ['build', 'compress:dist']);
};
