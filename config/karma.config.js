module.exports = function (config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '../',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],

		plugins: [
			'karma-webpack',
			'karma-jasmine',
			'karma-jasmine-matchers',
			'karma-phantomjs2-launcher',
		],

		// list of files / patterns to load in the browser
		files: [
			'./config/karma.webpack.js'
		],

		// list of files to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'./config/karma.webpack.js': ['webpack']
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS2'],

		webpack: {
			devtool: 'inline-source-map',
			module: {
				loaders: [
					{
						test: /\.js$/,
						loader: 'babel-loader',
					}
				]
			},
			node: {
				fs: 'empty',
			},
		},

		webpackServer: {
			noInfo: true
		},
	});
};
