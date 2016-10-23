import chai from 'chai';
chai.should();
import wd from 'wd';
import { sleep } from 'asyncbox';

let driver = wd.promiseChainRemote('localhost', 4723);
let capabilities = {
  "browserName" : "",
  "deviceName" : "",
  "platformName" : "",
  "platformVersion" : "",
};

describe("Test appium workshop exercise 1", _ => {

  before(async () => {
    await driver.init(capabilities);
  });

  after(async () => {
    await driver.quit();
  });

  it("Test page title is correct", async () => {
    await sleep(5000);
    let url = "";
    await driver.get(url);
    await sleep(500);
    let title = "";
    let pageTitle = await driver.title();
    pageTitle.should.equal(title);
  });
});
