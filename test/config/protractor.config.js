const SpecReporter = require("jasmine-spec-reporter").SpecReporter;

exports.config = {

  directConnect: true,

  capabilities: {
    browserName: "chrome",
  },

  framework: "jasmine",

  specs: ["../specs/*.js"],

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
  },

  onPrepare: function () {
    jasmine.getEnv().addReporter(
      new SpecReporter({
        suite: {
          displayNumber: true,
        },
        spec: {
          displayPending: true,
          displayDuration: true,
        },
        summary: {
          displaySuccesses: false,
          displayFailed: false,
          displayPending: false,
        },
      })
    );
  },
};
