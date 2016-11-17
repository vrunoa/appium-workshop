import chai from 'chai';
chai.should();
const expect = chai.expect;
import wd from 'wd';
import { sleep } from 'asyncbox';

let driver = wd.promiseChainRemote('localhost', 4723);
let capabilities = {
  "browserName" : "",
  "app" : "/Users/vruno/Sauce/appium-workshop/files/native.apk",
  "deviceName" : "Android Emulator",
  "platformName" : "Android",
  "platformVersion" : "4.4",
  "avd" : "Phone_Landscape_API_19",
  "appPackage" : "com.saucelabs.appium.workshop.app",
  "appActivity" : ".SplashActivity",
  "appWaitActivity" : ".MainActivity"
};

describe("Testing appium workshop native app", _ => {

  before(async () => {
    await driver.init(capabilities);
  });

  after(async () => {
    await driver.quit();
  });
  it("Test MainActivity", async () => {
    let currentActivity = await driver.getCurrentActivity();
    currentActivity.should.equal(".MainActivity");
    let els = [
      { className: 'title', visible: true},
      { className: 'button_1', visible: true}
    ];
    for(let i in els) {
      let el = await driver.elementById(els[i].className);
      el.should.not.equal(null);
      let isVisible = await el.isDisplayed();
      isVisible.should.equal(els[i].visible);
    }
    let button = await driver.elementById('button_1');
    await button.click();
    await sleep(500);
    currentActivity = await driver.getCurrentActivity();
    currentActivity.should.equal(".ElementsActivity");
  });
  it("Test ElementsActivity", async () => {
    let currentActivity = await driver.getCurrentActivity();
    currentActivity.should.equal(".ElementsActivity");
    let els = [
      { className: 'title', visible: true},
      { className: 'label_1', visible: true},
      { className: 'button_1', visible: true},
      { className: 'textbox_1', visible: true},
      { className: 'checkbox_1', visible: true},
      { className: 'button_2', visible: true}
    ]
    for(let i in els) {
      let el = await driver.elementById(els[i].className);
      el.should.not.equal(null);
      let isVisible = await el.isDisplayed();
      isVisible.should.equal(els[i].visible);
    }
    let el = await driver.elementByIdOrNull('error');
    expect(el).to.equal(null);
    el = await driver.elementById('textbox_1');
    let val = await el.text();
    val.should.equal('Clear me');
    el = await driver.elementById('checkbox_1');
    val = await el.getAttribute("checked");
    expect(val).to.equal('false');
    let submitBtt = await driver.elementById('button_2');
    await submitBtt.click();
    await sleep(500);
    el = await driver.elementById("error");
    let isVisible = await el.isDisplayed();
    isVisible.should.equal(true);
    val = await el.text();
    val.should.equal("Please change the text in the textbox to 'Im changed'");
    el = await driver.elementById('button_1');
    el.click();
    await sleep(500);
    el = await driver.elementById("error");
    isVisible = await el.isDisplayed();
    isVisible.should.equal(true);
    val = await el.text();
    val.should.equal("Please use the .clear method to clear the textbox value");
    el = await driver.elementById('textbox_1');
    await el.clear();
    val = await el.text();
    val.should.equal("");
    await submitBtt.click();
    sleep(500);
    el = await driver.elementById("error");
    isVisible = await el.isDisplayed();
    isVisible.should.equal(true);
    val = await el.text();
    val.should.equal("Please fill the textbox with the text 'Im changed'");
    el = await driver.elementById('textbox_1');
    await el.sendKeys('Im changed');
    val = await el.text();
    val.should.equal('Im changed');
    await submitBtt.click();
    await sleep(500);
    el = await driver.elementById("error");
    isVisible = await el.isDisplayed();
    isVisible.should.equal(true);
    val = await el.text();
    val.should.equal("Come on, im doing my best! Please check the checkbox");
    el = await driver.elementById('checkbox_1');
    await el.click();
    val = await el.getAttribute("checked");
    val.should.equal("true");
    await submitBtt.click();
    await sleep(500);
    currentActivity = await driver.getCurrentActivity();
    currentActivity.should.equal(".MainActivity");
  });
  it("Test MainActivity back", async () => {
    let currentActivity = await driver.getCurrentActivity();
    currentActivity.should.equal(".MainActivity");
    await driver.back();
    currentActivity = await driver.getCurrentActivity();
    currentActivity.should.equal(".SplashActivity");
  });
});
