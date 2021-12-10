const expect = require("chai").expect;
const decache = require("decache");
let CountryPage = require("../page_object/country_page/country_page");
let HomePage = require("../page_object/home_page/home_page");
let ProductSelectorPage = require("../page_object/productSelectorPage/productSelectorPage");

describe("Smoke test", function () {
  beforeEach(function () {
    decache("../page_object/country_page/country_page");
    decache("../page_object/home_page/home_page");
    decache("../page_object/productSelectorPage/productSelectorPage");
    CountryPage = require("../page_object/country_page/country_page");
    HomePage = require("../page_object/home_page/home_page");
    ProductSelectorPage = require("../page_object/productSelectorPage/productSelectorPage");
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
  });

  afterEach(function () {
    browser.quit();
  });

  it("Select correct country", async function () {
    await CountryPage.open();

    //All "wait" methods are created for clarity when passing tests
    await CountryPage.wait(2000);
    await CountryPage.clickUSCountry();
    await HomePage.wait(2000);

    //Verifying that the correct country is selected
    const CountryText = await HomePage.CountrySelector.getText();
    expect(CountryText).to.be.equal("UNITED STATES");
  });

  it("Verifying displaying Total Power Draw", async function () {
    await HomePage.open();
    await HomePage.wait(3000);
    await HomePage.Header.clickSupport();
    await HomePage.Header.clickProductSelector();
    await HomePage.wait(2000);

    //UPS Selector page is opened
    await ProductSelectorPage.clickUPSSelector();
    await ProductSelectorPage.clickHomeEnvironmentRadio();
    await ProductSelectorPage.clickConfigureByLoadButton();
    await HomePage.wait(2000);
    await ProductSelectorPage.sendKeysTotalPower(100);
    const TotalPowerText = await ProductSelectorPage.TotalPowerLabel.getText();
    expect(TotalPowerText).to.be.equal("100 / 1200 Watts");
  });

  it("Verifying work of slider on Total Power Draw", async function () {
    await HomePage.open();
    await HomePage.wait(3000);
    await HomePage.Header.clickSupport();
    await HomePage.Header.clickProductSelector();
    await HomePage.wait(2000);
    await ProductSelectorPage.clickUPSSelector();
    await ProductSelectorPage.clickHomeEnvironmentRadio();
    await ProductSelectorPage.clickConfigureByLoadButton();
    await HomePage.wait(2000);

    //Mouse actions
    await browser
      .actions()
      .mouseDown(ProductSelectorPage.SelectorTotalPower)
      .mouseMove({ x: 10000, y: 0 })
      .mouseUp()
      .perform();
    await HomePage.wait(2000);
    const TotalPowerText = await ProductSelectorPage.TotalPowerLabel.getText();
    expect(TotalPowerText).to.be.equal("1200 / 1200 Watts");
  });

  //Keyboard actions and implementation of JavaScript Executor
  it("Verifying displaying Total Power Draw through action", async function () {
    await ProductSelectorPage.open();
    await HomePage.wait(2000);
    await ProductSelectorPage.clickHomeEnvironmentRadio();
    await ProductSelectorPage.clickConfigureByLoadButton();
    await HomePage.wait(3000);
    await browser.executeScript(
      "window.scrollTo(0, document.body.scrollHeight)"
    );
    await HomePage.wait(2000);
    await browser.executeScript("window.scrollTo(0, 0)");
    await HomePage.wait(2000);
    await browser
      .actions()
      .click(ProductSelectorPage.TotalPowerInput)
      .sendKeys("300")
      .perform();
    const TotalPowerkeyText =
      await ProductSelectorPage.TotalPowerLabel.getText();
    expect(TotalPowerkeyText).to.be.equal("300 / 1200 Watts");
  });
});
