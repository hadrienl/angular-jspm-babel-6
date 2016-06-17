/* global module */
module.exports = function (config) {
	'use strict';
	config.set({
		//logLevel: config.LOG_DEBUG,
		autoWatch: true,
		singleRun: true,

		frameworks: ['jspm', 'jasmine'],

		files: [
			'node_modules/babel-polyfill/dist/polyfill.js'
		],

		jspm: {
			loadFiles: [
				'src/**/*.js',
				//'src/**/*.spec.js',
				'src/**/*.html'
			],
			serveFiles: [
				'src/**/*!(*spec).js'
			]
		},

		proxies: {
			'/src/': '/base/src/',
			'/jspm_packages/': '/base/jspm_packages/'
		},

		browsers: ['PhantomJS'],

		preprocessors: {
			'src/**/*!(*spec).js': ['babel', 'sourcemap', 'coverage'],
			'src/**/*.html': ['ng-html2js']
		},

		babelPreprocessor: {
			options: {
				sourceMap: 'inline',
			  presets: ['es2015'],
			  plugins: [
			    'transform-decorators-legacy',
			    'transform-class-properties'
			  ]
			},
			sourceFileName: function(file) {
				return file.originalPath;
			}
		},

		ngHtml2JsPreprocessor: {
      stripPrefix: 'src',
      prependPrefix: 'dist',
      moduleName: 'mocked-templates'
    },

		reporters: ['coverage', 'progress'],

		coverageReporter: {
			instrumenters: {isparta: require('isparta')},
			instrumenter: {
				'src/*.js': 'isparta'
			},

			reporters: [
				{
					type: 'text-summary',
					subdir: normalizationBrowserName
				},
				{
					type: 'html',
					dir: 'coverage/',
					subdir: normalizationBrowserName
				}
			]
		}
	});

	function normalizationBrowserName(browser) {
		return browser.toLowerCase().split(/[ /-]/)[0];
	}
};
