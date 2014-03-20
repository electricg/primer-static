module.exports = function(grunt) {

    // Initializes the Grunt tasks with the following settings
    grunt.initConfig({

        project: {
            name: "primer-static",
            url : "http://primerstatic.prod/"
        },

        datetime: {
            d  : ("0"+(new Date()).getDate()).slice(-2),
            m  : ("0"+((new Date()).getMonth() + 1)).slice(-2), 
            y  : (new Date()).getFullYear(),
            hh : ("0"+(new Date()).getHours()).slice(-2),
            mm : ("0"+(new Date()).getMinutes()).slice(-2),
            ss : ("0"+(new Date()).getSeconds()).slice(-2)
        },

        timestamp: "[<%= datetime.y %>.<%= datetime.m %>.<%= datetime.d %> <%= datetime.hh %>.<%= datetime.mm %>.<%= datetime.ss %>]",

        // A list of files, which will be syntax-checked by JSHint
        jshint: { 
            files : ["src/_assets/javascripts/js/*.js"]
        },


        shell: {
            jekylldev: {
                command: 'jekyll build --config _config.yml,_config_dev.yml',
                options: {
                    stdout: true
                }
            },

            jekyllprod: {
                command: 'jekyll build --config _config.yml,_config_prod.yml',
                options: {
                    stdout: true
                }
            }

        },

        prettify: {
            options: {
                indent: 4,
                indent_char: " ",
                condense: false,
                preserve_newlines: true,
                unformatted: ["head", "pre", "code"]
            },
            
            all: {
                expand: true, 
                cwd: 'prod',
                dest: 'prod', 
                src: '**/*.html'
            },
        },

        validation: {
            dev: {
                options: {
                    reset: true,
                    stoponerror: false,
                    path: "dev/<%= project.name %>-DEV-validation-<%= timestamp %>.json",
                    reportpath: false,
                    relaxerror: ["X-UA", "role"]
                },

                files: {
                    src: ['dev/*.html']
                }
            },
            prod: {
                options: {
                    reset: true,
                    stoponerror: false,
                    path: "prod/<%= project.name %>-W3Cvalidation.json",
                    reportpath: false,
                    relaxerror: ["X-UA", "role"]
                },

                files: {
                    src: ['prod/*.html']
                }                
            }
        },

        lineending: {              
            dist: {                   
                options: {              
                    eol: 'lf'
                },

                files: [{
                    expand: true,
                    cwd: 'docroot',
                    dest: 'docroot',
                    src: '**/*.html'
                }]
            }
        },

        rsync: {
            dev: {
                src: "dev/",
                dest: "../dist",
                recursive: true,
                exclude: [".git*"]
            },


            prod: {
                src: "prod/",
                dest: "",
                host: "",
                recursive: true,
                syncDest: false,
                exclude: [".git*"]
            }
        },


        smushit: {
            dev: {
                  src: ['dev/**/*.png','dev/**/*.jpg']
            },
            prod: {
                  src: ['prod/**/*.png','prod/**/*.jpg']
            }
        },


        compress: {
            src: {
                options: {
                    pretty: true,
                    archive: "./backup/<%= project.name %>-SRC-<%= timestamp %>.zip"
                },
                expand: true,
                cwd: 'src/',
                src: ['**/*'],
            },
            prod: {
                options: {
                    pretty: true,
                    archive: "./backup/<%= project.name %>-PROD-<%= timestamp %>.zip"
                },
                expand: true,
                cwd: 'prod/',
                src: ['**/*'],
            }        
        },       

        sitemap: {
            prod: {
                siteRoot: "prod/",
                pattern:  "**/*.html",
                homepage: "<%= project.url %>"
            }
        },
        
        // Tasks being executed with 'grunt watch'
        watch: {  
            jekyll: {
                files: ['src/**/*'],
                tasks: ['shell:jekylldev']
            },
            options: {
                livereload: true
            }
        }
    });

    // Load the plugins that provide the tasks we specified in package.json.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks("grunt-rsync")
    grunt.loadNpmTasks('grunt-smushit');
    grunt.loadNpmTasks('grunt-lineending');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-sitemap');

    // This is the default task being executed if Grunt
    // is called without any further parameter.
    grunt.registerTask(
        'dev', 
        'Call Jekyll compilation using DEV configuration (on dev/ folder)',
        ['shell:jekylldev', 'jshint', 'validation:dev']);
    
    grunt.registerTask(
        'prod', 
        'Deploy clean templates in a remote server using PROD configuration (on prod/ folder)',
        ['shell:jekyllprod', 'prettify', 'jshint', 'validation:prod', 'lineending', 'smushit:prod', 
         'sitemap:prod', 'compress:src', 'compress:prod', 'rsync:prod']);

};