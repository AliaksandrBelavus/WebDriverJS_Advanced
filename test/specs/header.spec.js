const expect = require("chai").expect;
const CountryPage = require("../pageObject/countryPage/countryPage");
const HomePage = require("../pageObject/homePage/homePage");
const ProductSelectorPage = require("../pageObject/productSelectorPage/productSelectorPage");
const wait = require("../helper/wait");
const siteLocation = "UNITED STATES";
const displayedTotalPowerDraw = "100 / 1200 Watts";
const displayedFullTotalPowerDraw = "1200 / 1200 Watts";

describe("Smoke test", function () {
  beforeAll(function () {
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
  });

  afterAll(function () {
    browser.quit();
  });

  it("Select correct country", async function () {
    await CountryPage.open(CountryPage.url);
    await wait(2000);
    await CountryPage.clickUSCountry();
    await wait(2000);
    const CountryText = await HomePage.CountrySelector.getText();
    expect(CountryText).to.be.equal(siteLocation);
  });

  it("Verifying displaying Total Power Draw", async function () {
    await HomePage.open(HomePage.url);
    await wait(3000);
    await HomePage.Header.clickSupport();
    await wait(2000);
    await HomePage.Header.clickProductSelector();
    await wait(2000);
    await ProductSelectorPage.clickUPSSelector();
    await wait(3000);
    await ProductSelectorPage.clickHomeEnvironmentRadio();
    await wait(2000);
    await ProductSelectorPage.clickConfigureByLoadButton();
    await wait(2000);
    await ProductSelectorPage.sendKeysToTotalPowerInput(100);
    const TotalPowerText = await ProductSelectorPage.TotalPowerLabel.getText();
    expect(TotalPowerText).to.be.equal(displayedTotalPowerDraw);
  });

  it("Verifying work of slider on Total Power Draw", async function () {
    await HomePage.open(HomePage.url);
    await wait(3000);
    await HomePage.Header.clickSupport();
    await wait(2000);
    await HomePage.Header.clickProductSelector();
    await wait(2000);
    await ProductSelectorPage.clickUPSSelector();
    await wait(7000);
    await ProductSelectorPage.clickHomeEnvironmentRadio();
    await wait(2000);
    await ProductSelectorPage.clickConfigureByLoadButton();
    await wait(5000);
    //Mouse actions
    await browser.actions().mouseDown(ProductSelectorPage.SliderTotalPower).mouseMove({ x: 10000, y: 0 }).mouseUp().perform();
    await wait(2000);
    const FullTotalPowerText = await ProductSelectorPage.TotalPowerLabel.getText();
    expect(FullTotalPowerText).to.be.equal(displayedFullTotalPowerDraw);
  });

  //Keyboard actions and implementation of JavaScript Executor
  it("Verifying displaying Total Power Draw through action", async function () {
    await ProductSelectorPage.open(ProductSelectorPage.url);
    await wait(2000);
    await ProductSelectorPage.clickUPSSelector();
    await wait(7000);
    await ProductSelectorPage.clickHomeEnvironmentRadio();
    await wait(2000);
    await ProductSelectorPage.clickConfigureByLoadButton();
    await wait(2000);
    await browser.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    await wait(2000);
    await browser.executeScript("window.scrollTo(0, 0)");
    await wait(2000);
    await browser.actions().click(ProductSelectorPage.TotalPowerInput).sendKeys("100").perform();
    const TotalPowerText = await ProductSelectorPage.TotalPowerLabel.getText();
    expect(TotalPowerText).to.be.equal(displayedTotalPowerDraw);
  });
});
