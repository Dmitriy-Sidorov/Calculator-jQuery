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
            prefix: {
                options: {
                    processors: [
                        require('autoprefixer')({
                            browsers: ['last 20 version', 'ie 9', 'ie 8']
                        })
                    ]
                },
                files: [
                    {
                        src: './styles/style.css',
                        dest: './html/css/style.css'
                    },
                    {
                        src: './styles/style.css'
                    }

                ]
            },

            min: {
                options: {
                    processors: [
                        require('cssnano')
                    ]
                },
                src: './styles/style.css',
                dest: './html/css/style.min.css'
            }
        },

        concat: {
            options: {
                separator: '\n'
            },
            dist: {
                src: ["js/libs/bootstrap.min.js", 'js/card.js', 'js/solaris.js'],
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
                tasks: ['style', 'postcss'],
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
                    livereload: true,
                    spawn: false
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    base: 'html',
                    keepalive: true,
                    livereload: true
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    grunt.registerTask('default', [
        'style', 'scripts'
    ]);

    grunt.registerTask('style', [
        'sass:style',
        'postcss:prefix',
        'postcss:min'
    ]);

    grunt.registerTask('scripts', ['concat', 'uglify']);

    grunt.registerTask('server', function () {
        return grunt.task.run(['connect:server'])
    });

};