import chai from 'chai';
chai.should();
import wd from 'wd';
import { sleep } from 'asyncbox';

let driver = wd.promiseChainRemote('localhost', 4723);
let capabilities = {
  "browserName" : "",
  "deviceName" : " ",
  "platformName" : "",
  "platformVersion" : "",
  "avd" : ""
};

describe("Test appium workshop exercise 2", _ => {

  before(async () => {
    await driver.init(capabilities);
  });

  after(async () => {
    await driver.quit();
  });

  it("Test url opens on Android Emulator", async () => {
    await sleep(5000);
    let url = "";
    await driver.get(url);
  });
});
