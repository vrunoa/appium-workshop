import chai from 'chai';
chai.should();
const expect = chai.expect;
import wd from 'wd';
import { sleep } from 'asyncbox';

const localIP = 'http://10.0.2.2:8080'
let driver = wd.promiseChainRemote('localhost', 4723);
let capabilities = {
  "browserName" : "safari",
  "deviceName" : "iPhone 5s Simulator",
  "platformName" : "ios",
  "platformVersion" : "9.3"
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
    let pageTitle = await driver.title();
    pageTitle.should.equal("Appium Workshop");
    let els = [
      { className: 'title', visible: true},
      { className: 'welcome_text', visible: true},
      { className: 'started_text', visible:true},
      { className: 'goto_texts', visible: true},
      { className: 'lied_text', visible: false},
      { className: 'button_2', visible: false},
      { className: 'button_1', visible: true}
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
    url = await driver.eval("window.location.href");
    url.should.equal(`${localIP}/finding_elements.html`);
  });
  it("Test finding_elements.html", async () => {
    let url = `${localIP}/finding_elements.html`;
    await driver.get(url);
    let pageTitle = await driver.title();
    pageTitle.should.equal("Appium Workshop - Finding elements");
    let els = [
      { className: 'title', visible: true},
      { className: 'intro_text', visible: true},
      { className: 'error', visible:false},
      { className: 'label_1', visible: true},
      { className: 'label_1', visible: true},
      { className: 'button_1', visible: true},
      { className: 'label_2', visible: true},
      { className: 'checkbox_1', visible: true},
      { className: 'button_2', visible: true},
      { className: 'success', visible: false},
      { className: 'button_3', visible: false}
    ]
    for(let i in els) {
      let el = await driver.elementByClassName(els[i].className);
      el.should.not.equal(null);
      let isVisible = await el.isDisplayed();
      isVisible.should.equal(els[i].visible);
    }
    let el = await driver.elementById('textbox_1');
    let val = await el.getValue();
    val.should.equal('Clear me');
    el = await driver.elementById('checkbox_1');
    val = await el.getAttribute("checked");
    expect(val).to.equal(null);
    let submitBtt = await driver.elementById('button_2');
    await submitBtt.click();
    await sleep(500);
    el = await driver.elementByClassName("error");
    let isVisible = await el.isDisplayed();
    isVisible.should.equal(true);
    val = await el.text();
    val.should.equal("Please change the text in the textbox to 'Im changed'");
    el = await driver.elementById('button_1');
    el.click();
    await sleep(500);
    el = await driver.elementByClassName("error");
    isVisible = await el.isDisplayed();
    isVisible.should.equal(true);
    val = await el.text();
    val.should.equal("Please use the .clear method to clear the textbox value");
    el = await driver.elementById('textbox_1');
    await el.clear();
    val = await el.getValue();
    val.should.equal("");
    await submitBtt.click();
    sleep(500);
    el = await driver.elementByClassName("error");
    isVisible = await el.isDisplayed();
    isVisible.should.equal(true);
    val = await el.text();
    val.should.equal("Please fill the textbox with the text 'Im changed'");
    el = await driver.elementById('textbox_1');
    await el.sendKeys('Im changed');
    val = await el.getValue();
    val.should.equal('Im changed');
    await submitBtt.click();
    await sleep(500);
    el = await driver.elementByClassName("error");
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
    el = await driver.elementById("form_container");
    isVisible = await el.isDisplayed();
    isVisible.should.equal(false);
    el = await driver.elementByClassName("success");
    isVisible = await el.isDisplayed();
    isVisible.should.equal(true);
    el = await driver.elementById("button_3");
    isVisible = await el.isDisplayed();
    isVisible.should.equal(true);
    await el.click();
    await sleep(1500);
    url = await driver.eval("window.location.href");
    url.should.equal(`${localIP}/hybrid_context.html`);
  });
  it("Test hybrid_context.html", async () => {
    let url = `${localIP}/hybrid_context.html`;
    await driver.get(url);
    let pageTitle = await driver.title();
    pageTitle.should.equal("Appium Workshop - Hybrid");
    let els = [
      { className: 'title', visible: true},
      { className: 'intro_text', visible: true},
      { className: 'button_2', visible:false},
      { className: 'button_1', visible:true}
    ]
    for(let i in els) {
      let el = await driver.elementByClassName(els[i].className);
      el.should.not.equal(null);
      let isVisible = await el.isDisplayed();
      isVisible.should.equal(els[i].visible);
    }
    let button = await driver.elementById("button_1");
    await button.click();
    await sleep(500);
    let isVisible = await button.isDisplayed();
    isVisible.should.equal(false);
    button = await driver.elementById("button_2");
    isVisible = await button.isDisplayed();
    isVisible.should.equal(true);
    await button.click();
    await sleep(1500);
    url = await driver.eval("window.location.href");
    url.should.equal(`${localIP}/sauce_connect.html`);
  });
  it("Test sauce_connect.html", async () => {
    let url = `${localIP}/sauce_connect.html`;
    await driver.get(url);
    let pageTitle = await driver.title();
    pageTitle.should.equal("Appium Workshop - SC");
    let els = [
      { className: 'title', visible: true},
      { className: 'intro_text', visible: true},
      { className: 'phone_five', visible:false},
      { className: 'button_1', visible:true}
    ]
    for(let i in els) {
      let el = await driver.elementByClassName(els[i].className);
      el.should.not.equal(null);
      let isVisible = await el.isDisplayed();
      isVisible.should.equal(els[i].visible);
    }
    let el = await driver.elementById("button_1");
    await el.click();
    await sleep(500);
    let isVisible = await el.isDisplayed();
    isVisible.should.equal(false);
    el = await driver.elementById("phone_five");
    isVisible = await el.isDisplayed();
    isVisible.should.equal(true);
  });
});
