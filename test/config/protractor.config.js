exports.config = {
  restartBrowserBetweenTests: true,

  directConnect: true,

  Capabilities: [{
    'browserName': 'chrome'
  }],

  framework: "jasmine",

  specs: ["../specs/*.js"],

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
  },
};
