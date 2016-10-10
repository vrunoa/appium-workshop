import chai from 'chai';
import wd from 'wd';
import { sleep } from 'asyncbox';

let driver = wd.promiseChainRemote('localhost', 4723);
// TODO - set the capabilities to test over Chrome in an Android Emulator
let capabilities = {
  "browserName" : "Chrome",
  "deviceName" : "Android Emulator",
  "platformName" : "Android",
  "platformVersion" : "4.4.3"
};

describe("Test appium workshop excersie 1", _ => {

  before(async () => {
    await driver.init(capabilities);
  });

  after(async () => {
    await driver.quit();
  });

  it("Test url opens on Android Emulator", async (done) => {
    await sleep(5000);
    // TODO - open http://appium-workshop.github.com/ url and verify the title equals Node Conf Appium Aorkshop
    await driver.get('http://appium-workshop.github.com');
    await sleep(500);
    let title = await driver.title();
    title.should.equal("NodeConf Appium Workshop");
    done();
  });

});
