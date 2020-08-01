const realBrowser = String(process.env.BROWSER).match(/^(1|true)$/gi);
const travisLaunchers = {
  chrome_travis: {
    base: 'Chrome',
    flags: [ '--no-sandbox' ]
  }
};

const localBrowsers = realBrowser ? Object.keys(travisLaunchers) : [ 'Chrome' ];

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: [ 'jasmine', 'karma-typescript' ],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-typescript',
      'karma-spec-reporter',  //
      // 'karma-jasmine-html-reporter' for 'kjhtml'
    ],
    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.json",
    },
    client: {
      // leave Jasmine Spec Runner output visible in browser
      clearContext: false,
    },
    files: [ { pattern: 'src/**/*.ts' }, { pattern: 'test/**/*.spec.ts' } ],
    preprocessors: {
      '**/*.ts': [ 'karma-typescript' ],
    },
    reporters: [  'karma-typescript', 'spec'], // Use 'kjhtml' reporter for print result in browser.
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: localBrowsers,
    singleRun: true,
  })
};
