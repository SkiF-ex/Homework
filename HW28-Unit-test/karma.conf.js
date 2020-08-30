module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'jasmine-matchers'],
        preprocessors: {
            '*.js': ['coverage']
        },
        files: [
            '*.js',
            '*spec.js',
        ],
        plugins: [
            'karma-jasmine',
            'karma-jasmine-matchers',
            'karma-jasmine-html-reporter',
            'karma-chrome-launcher',
            'karma-coverage',
        ],
        reporters: ['kjhtml', 'coverage'],
        colors: true,
        browsers: ['Chrome'],
        singleRun: false,
        client:{
            clearContext: false
        },
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {type: 'html', subdir: 'html'}
            ]
        }
    })
};
