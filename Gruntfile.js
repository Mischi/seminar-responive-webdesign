'use strict';

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
              { src: 'images/*', dest: 'dist/', filter: 'isFile' }
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
              environment: 'production'
            }
          }
        },

        uglify: {
          dist: {
            files: {
              'dist/site.min.js': [
                'components/skrollr/dist/skrollr.min.js', 
                'components/skrollr/dist/skrollr.menu.min.js',
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
          html: ['dist/index.html'],
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
                files: ['index.html', 'sass/*.scss', 'js/*.js', 'images/*'],
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
