import isAppiumRunning from 'appium-running';

describe("Test appium is running", _ => {

  it("Test appium is running", async () => {
    /**
    * Run appium on your terminal and run this test to verify appium is running
    **/
    let success = await isAppiumRunning();
    if(!success) throw new Error("Appium is not running!");
  });

});
