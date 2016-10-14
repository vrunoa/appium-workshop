import chai from 'chai';
chai.should();
import wd from 'wd';
import { sleep } from 'asyncbox';

let driver = wd.promiseChainRemote('localhost', 4723);
// TODO - set the capabilities to test over Chrome in an iOS Simulator
let capabilities = {
  "browserName" : "Browser",
  "deviceName" : "Android Emulator",
  "platformName" : "Android",
  "platformVersion" : "5.0",
  "avd" : "Nexus_5_API_19"
};

describe("Test appium workshop exercise 2", _ => {

  before(async () => {
    await driver.init(capabilities);
  });

  after(async () => {
    await driver.quit();
  });

  it("Test url opens on Android Emulator", async () => {
    
    await driver.setImplicitWaitTimeout(5000);
    // TODO - open https://vrunoa.github.io/appium-workshop/ url and verify the title equals Appium Aorkshop
    await driver.get('http://vrunoa.github.io/appium-workshop/');
    await sleep(500);
    let title = await driver.title();
    title.should.equal("Appium Workshop");
  });
});
