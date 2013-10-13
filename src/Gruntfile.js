module.exports = function (grunt) {

    "use strict";

    var pkg = require('./package');

    grunt.initConfig({
        pkg: pkg,

        paths: {
            js: {
                src: 'asset/js',
                dest: 'js'
            },
            css: {
                src: 'asset/style',
                dest: 'css'
            }
        },

        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile']
            },
            js: {
                files: '<%= paths.js.src %>/*.js',
                tasks: ['jshint', 'concat:js']
            },
            stylus: {
                files: ['<%= paths.css.src %>/**/*.styl'],
                tasks: ['concat:stylus', 'stylus']
            }
        },

        jshint: {
            gruntfile: {
                src: '<%= watch.gruntfile.files %>'
            },
            js: {
                src: '<%= watch.js.files %>'
            }
        },

        concat: {
            js: {
                src: [ '<%= paths.js.src %>/*.js' ],
                dest: '<%= paths.js.dest %>/app.js'
            },
            stylus: {
                src: [ '<%= paths.css.src %>/*.styl' ],
                dest: '<%= paths.css.src %>/dist/style.styl'
            }
        },

        uglify: {
            js: {
                expand: true,
                cwd: '<%= paths.js.dest %>',
                src: ['**/*.js', '!**/*.min.js'],
                dest: '<%= paths.js.dest %>',
                ext: '.min.js'
            }
        },

        stylus: {
            files: {
                expand: true,
                cwd: '<%= paths.css.src %>/dist',
                src: ['**/*.styl'],
                dest: '<%= paths.css.dest %>',
                ext: '.css'
            }
        },

        csso: {
            css: {
                expand: true,
                cwd: '<%= paths.css.dest %>/dist/',
                src: ['*.css', '!**/*.min.css'],
                dest: '<%= paths.css.dest %>',
                ext: '.min.css'
            }
        },

        clean: {
            js: {
                src: '<%= paths.js.dest %>'
            },
            css: {
                src: '<%= paths.css.dest %>'
            }
        }
    });

// Load npm tasks
    Object.keys(pkg.devDependencies).forEach(function (dep) {
        if (dep !== 'grunt-cli' && /^grunt-/.test(dep)) {
            grunt.loadNpmTasks(dep);
        }
    });


// Build task
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('compile', ['concat', 'stylus']);
    grunt.registerTask('compress', ['uglify', 'csso']);

// Default task.
    grunt.registerTask('default', 'watch');
};