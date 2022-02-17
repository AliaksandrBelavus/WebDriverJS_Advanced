const Header = require("./header");

class BasePage {
  constructor() {
    this.Header = new Header();
  }
  open() {
    browser.get(this.url);
  }
}

module.exports = BasePage;
