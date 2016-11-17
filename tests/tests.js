import chai from 'chai';
chai.should();
import wd from 'wd';
import { sleep } from 'asyncbox';

const localIP = 'http://10.0.2.2:8080'
let driver = wd.promiseChainRemote('localhost', 4723);
let capabilities = {
  "browserName" : "browser",
  "deviceName" : "Android Emulator",
  "platformName" : "Android",
  "platformVersion" : "4.4",
  "avd" : "Phone_Landscape_API_19",
};

describe("Testing appium workshop pages", _ => {

  before(async () => {
    await driver.init(capabilities);
  });

  after(async () => {
    await driver.quit();
  });

  it("Test index.html", async () => {
    let url = `${localIP}/index.html`;
    await driver.get(url);
    url = await driver.getCurrentUrl();
    await sleep(500);
    let pageTitle = await driver.title();
    pageTitle.should.equal("Appium Workshop");
    let els = [
      { className: 'title', visible: true},
      { className: 'welcome_text', visible: true},
      { className: 'started_text', visible:true},
      { className: 'goto_texts', visible: true},
      { className: 'lied_text', visible: false},
      { className: 'button_2', visible: false},
      { className: 'button_1', visible: true},
    ];
    for(let i in els) {
      let el = await driver.elementByClassName(els[i].className);
      el.should.not.equal(null);
      let isVisible = await el.isDisplayed();
      isVisible.should.equal(els[i].visible);
    }
    let button = await driver.elementById('button_1');
    await button.click();
    await sleep(500);
    button = await driver.elementById('button_1');
    let isVisible = await button.isDisplayed();
    isVisible.should.equal(false);
    let el = await driver.elementByClassName('goto_texts');
    isVisible = await el.isDisplayed();
    isVisible.should.equal(false);
    el = await driver.elementByClassName("lied_text");
    isVisible = await el.isDisplayed();
    isVisible.should.equal(true);
    button = await driver.elementById('button_2');
    isVisible = await el.isDisplayed();
    isVisible.should.equal(true);
    await button.click();
    await sleep(1500);
    url = await driver.url();
    url.should.equal(`${localIP}/finding_elements.html`);
  });
});
