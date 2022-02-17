const Element = require("../baseElements/baseElements");

class Header {
  constructor() {
    this.supportButton = new Element("xpath", '//*[@id="apc-megamenu"]/li[3]/a');
    this.productSelectorButton = new Element("xpath", "//a[contains(text(),'Product Selectors')]"
    );
  }
  clickSupport() {
    this.supportButton.click();
  }
  clickProductSelector() {
    this.productSelectorButton.click();
  }
}

module.exports = Header;