const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const TIMEOUTS = {
  IMPLICIT: 10000,
  PAGE_LOAD: 30000,
  SCRIPT: 30000
};

class DriverManager {
  constructor() {
    this.driver = null;
  }

  async createDriver(options = {}) {
    const chromeOptions = new chrome.Options();
    
    if (options.headless) {
      chromeOptions.addArguments('--headless');
    }
    
    chromeOptions.addArguments('--disable-dev-shm-usage');
    chromeOptions.addArguments('--disable-extensions');
    chromeOptions.addArguments('--disable-gpu');
    chromeOptions.addArguments('--no-sandbox');
    
    if (options.viewport) {
      chromeOptions.addArguments(`--window-size=${options.viewport.width},${options.viewport.height}`);
    }

    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();

    await this.driver.manage().setTimeouts({
      implicit: TIMEOUTS.IMPLICIT,
      pageLoad: TIMEOUTS.PAGE_LOAD,
      script: TIMEOUTS.SCRIPT
    });

    return this.driver;
  }

  async quitDriver() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }

  getDriver() {
    return this.driver;
  }
}

module.exports = DriverManager;