const BasePage = require("../basePage/basePage");
const Element = require("../baseElements/baseElements");

class HomePage extends BasePage {
  constructor() {
    super();
    this.url = "https://www.apc.com/us/en";
    this.CountrySelector = new Element("css", "div.sdl-header-apc_lang-selector > a > span:nth-child(2)");
  }
}

const homePage = new HomePage();
module.exports = homePage;
