class Element {
  constructor(selectorType, selector) {
    if (selectorType === "css") {
      this.element = element(by.css(selector));
    } else {
      this.element = element(by.xpath(selector));
    }
    return this.element;
  }
  click() {
    return this.element.click();
  }
  async getText() {
    const elementText = await this.element.getText();
    return elementText;
  }

  async sendKeys(text) {
    const elementKeys = await this.element.sendKeys(text);
    return elementKeys;
  }
}

module.exports = Element;
