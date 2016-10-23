import isAppiumRunning from 'appium-running';
// TODO - Run appium

describe("Test appium is running", _ => {

  it("Test appium is running", async () => {
    let success = await isAppiumRunning();
    if(!success) throw new Error("Appium is not running!");
  });

});
