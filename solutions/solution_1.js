import chai from 'chai';
chai.should();
import wd from 'wd';
import { sleep } from 'asyncbox';
import isAppiumRunning from 'appium-running';

let driver = wd.promiseChainRemote('localhost', 4723);
// TODO - set the capabilities to test over Chrome in an iOS Simulator
let capabilities = {
  "browserName" : "Safari",
  "deviceName" : "iPhone 5s",
  "platformName" : "iOS",
  "platformVersion" : "10.0",
};

describe("Test appium workshop exercise 1", _ => {

  before(async () => {
    let success = await isAppiumRunning();
    if(!success) throw new Error("Appium is not running!");
    await driver.init(capabilities);
  });

  after(async () => {
    await driver.quit();
  });

  it("Test page title is correct", async () => {
    await sleep(5000);
    // TODO - open https://vrunoa.github.io/appium-workshop/ url and verify the title equals Appium Aorkshop
    await driver.get('https://vrunoa.github.io/appium-workshop/');
    await sleep(500);
    let title = await driver.title();
    title.should.equal("Appium Workshop");
  });
});
