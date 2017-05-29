module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            article: {
                src: 'javascript/article.js',
                dest: 'javascript/article.min.js'
            }
        },

        cssmin: {
          all: {
            files: [{
              expand: true,
              src: ['*.css', '!*.min.css'],
              cwd: 'css',
              dest: 'css',
              ext: '.min.css'
            }]
          }
        },

        responsive_images: {
            all: {
              options: {
                sizes: [{
                  name: 'small',
                  width: 320,
                },{
                  name: 'medium',
                  width: 640,
                  quality: 95
                },{
                  name: "large",
                  width: 1024,
                  quality: 90
                },{
                  name: "large",
                  suffix: "_x2",
                  width: 2048,
                  quality: 85,
                }]
              },
              files: [{
                expand: true,
                src: ['*.{jpg,gif,png}'],
                cwd: 'img-src/',
                dest: 'img/'
              }]
            }
          },

        imagemin: {
            all: {
                files: [{
                    expand: true,
                    src: ['*.{jpg,gif,png}'],
                    cwd: 'img/',
                    dest: 'img/'
                }]
            }
        },

        postcss: {
          options: {
            map: true,
            processors: [
              require('pixrem')(),
              require('autoprefixer')({browsers: 'last 2 versions'})
            ]
          },
          dist: {
           src: 'css/*.min.css'
          }
        },

        watch: {
            javascript: {
                files: ['javascript/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['css/*.css'],
                tasks: ['cssmin','postcss'],
                options: {
                    spawn: false,
                },
            },
            img_src: {
                files: ['img-src/*.{jpg,gif,png}'],
                tasks: ['responsive_images'],
                options: {
                    spawn: false,
                },
            },
            img_min: {
                files: ['img/*.{jpg,gif,png}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false,
                },
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask('default', ['uglify', 'cssmin', 'postcss', 'responsive_images', 'imagemin']);

};