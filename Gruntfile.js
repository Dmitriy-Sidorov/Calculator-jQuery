module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            style: {
                files: [
                    {
                        'html/css/style.css': 'styles/style.scss'
                    },
                    {
                        'styles/style.css': 'styles/style.scss'
                    }
                ]
            }
        },

        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')(
                        {
                            browsers: ['last 20 version']
                        }
                    ),
                    require('cssnano')
                ]
            },
            style: {
                files: [
                    {
                        src: 'styles/css/style.css',
                        dest: 'styles/css/style.min.css'
                    },
                    {
                        src: 'html/css/style.css',
                        dest: 'html/css/style.min.css'
                    }
                ]
            }
        },

        concat: {
            options: {
                separator: ' '
            },
            dist: {
                src: ['js/custom.js'],
                dest: 'html/js/built.js'
            }
        },

        uglify: {
            build: {
                src: 'html/js/built.js',
                dest: 'html/js/built.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'html/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'html/images/build'
                }]
            }
        },

        watch: {
            css: {
                files: ['styles/*.scss'],
                tasks: ['style'],
                options: {
                    livereload: true,
                    spawn: false,
                    reload: true
                }
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    grunt.registerTask('default', [
        'style', 'concat', 'uglify'
    ]);

    grunt.registerTask('style', [
        'sass:style',
        'postcss:style'
    ]);

    grunt.registerTask('scripts', ['concat', 'uglify']);

};