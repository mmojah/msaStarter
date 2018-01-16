module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin'); 
  grunt.loadNpmTasks('grunt-contrib-uglify'); 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      source: {
        files: ['sass/**/*.*'],
        tasks: ['sass']
      }      
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'sass',
          //src: ['wplocal.scss'],
          src: ['*.scss'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          //src: ['wplocal.css'],
          src: ['*.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }

    },

    jshint: {
        files: [
            'js/scripts.js',
        ],
        options: {
            expr: true,
            globals: {
                jQuery: true,
                console: true,
                module: true,
                document: true
            }
        }
    },    

    uglify: {
      dist: {
          options: {
              banner: '/*! <%= pkg.name %> <%= pkg.version %> nombredearchivo.min.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
              report: 'gzip'
          },
          files: {
              'js/output.min.js' : [
                  'js/scripts.js',
              ]
          }
      },
      dev: {
          options: {
              banner: '/*! <%= pkg.name %> <%= pkg.version %> scripts.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
              beautify: true,
              compress: false,
              mangle: false
          },
          files: {
              'js/scripts.js' : [
                  'js/scripts.js',
              ]
          }
      }
    },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'sass',
          cssDir: 'css',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: 'sass',
          cssDir: 'css'
        }
      }
    }

  });
  
  grunt.registerTask('default', [
    'sass', 
    'cssmin',
    'uglify:dist',
    'uglify:dev',
    'jshint',
    'compass'
    ]);
  
};