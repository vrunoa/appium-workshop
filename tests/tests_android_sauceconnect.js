import chai from 'chai';
chai.should();
const expect = chai.expect;
import wd from 'wd';
import { sleep } from 'asyncbox';
import sauce_keys from '../keys.json';

const localIP = 'http://localhost:8080';
const server = `http://${sauce_keys.production.user}:${sauce_keys.production.key}@ondemand.saucelabs.com:80/wd/hub`;

let driver = wd.promiseChainRemote(server);
let capabilities = {
  "browserName" : "Browser",
  "deviceName" : "Android Emulator",
  "platformName" : "Android",
  "platformVersion" : "5.1",
  "appiumVersion" : "1.5.3",
  "name": "Testing Android in the cloud using Sauce Connect"
};

describe("Testing appium workshop pages", _ => {

  before(async () => {
    await driver.init(capabilities);
  });

  after(async () => {
    await driver.quit();
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
