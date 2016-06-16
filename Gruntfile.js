module.exports = function(grunt) {

	// 1. All settings are here
	grunt.initConfig({

		concat: {
			options: {
				separator: ';',
			},

			// 2. Settings for combine *.js files
			dist: {
				src: [
					'calc.js',
					'common.js'
				],
			  dest: 'production.js',
			},
		},

		// 3. Settings for minimize generated *.js file
		uglify: {
			build: {
				src: 'production.js',
				dest: 'production.min.js'
			}
		},
	});	

	// 3. Here we define plugins which will be used
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// 4. Define which tasks to perform when command "grunt" will be run in terminal
	grunt.registerTask('default', ['concat', 'uglify']);
};