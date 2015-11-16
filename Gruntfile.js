/**
 * Created by Zeo on 11/16/15.
 */
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'client/scripts/*.js', //selects all js files in directory
                dest: 'server/public/assets/scripts/app.min.js'
            },

            controllers: {
                src: 'client/scripts/controllers/*.js',
                dest: 'server/public/assets/scripts/controllers/controllers.min.js'
            }

        },
        copy: {
            bootstrap: {
                expand: true,
                cwd: 'node_modules/bootstrap/dist/css/',
                src: [
                    "bootstrap.min.css"
                ],
                "dest": "server/public/vendors/"
            },
            angular: {
                expand: true,
                cwd: 'node_modules/angular',
                src: [
                    "angular.min.js",
                    "angular.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            angularMcss: {
                expand: true,
                cwd: 'node_modules/angular-material/modules',
                src: [
                    "angular-material.css"


                ],
                "dest": "server/public/vendors/"
            },

            angularAn: {
                expand: true,
                cwd: 'node_modules/angular-animate',
                src: [
                    "angular-animate.min.js"


                ],
                "dest": "server/public/vendors/"
            },


            angularAria: {
                expand: true,
                cwd: 'node_modules/angular-aria',
                src: [
                    "angular-aria.js"


                ],
                "dest": "server/public/vendors/"
            },

            angularMaterials: {
                expand: true,
                cwd: 'node_modules/angular-material/modules',
                src: [
                    "angular-material.min.js"


                ],
                "dest": "server/public/vendors/"
            },





            html: {
                expand: true,
                cwd: 'client/views/',
                src: [
                    "*/*",
                    "index.html"

                ],
                "dest": "server/public/assets/views/"
            },


            style: {
                expand: true,
                cwd: 'client/styles/',
                src: [
                    "style.css"
                ],
                "dest": "server/public/assets/styles/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};
