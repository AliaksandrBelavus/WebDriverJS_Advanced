class Element {
  constructor(selectorType, selector) {
    if (selectorType === "css") {
      this.element = element(by.css(selector));
    } else {
      this.element = element(by.xpath(selector));
    }
  }
  click() {
    this.element.click();
  }
  async getText() {
    const elementText = await this.element.getText();
    return elementText;
  }

  sendKeys(text) {
    this.element.sendKeys(text);
  }
}

module.exports = Element;