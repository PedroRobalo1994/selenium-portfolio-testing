const DriverManager = require('../utils/driver');
const HomePage = require('../pages/HomePage');
const TestHelpers = require('../utils/helpers');

const DESKTOP_VIEWPORT = TestHelpers.getViewportConfig('desktop');
const MOBILE_VIEWPORT = TestHelpers.getViewportConfig('mobile');

describe('Homepage Tests', () => {
  let driverManager;
  let driver;
  let homePage;

  beforeEach(async () => {
    driverManager = new DriverManager();
  });

  afterEach(async () => {
    await driverManager.quitDriver();
  });

  describe('Desktop Navigation', () => {
    beforeEach(async () => {
      driver = await driverManager.createDriver({ viewport: DESKTOP_VIEWPORT });
      homePage = new HomePage(driver);
      await homePage.navigate();
    });

    test('should display desktop navigation on large screens', async () => {
      const isDesktopNavVisible = await homePage.isDesktopNavigationVisible();
      const isHamburgerNavVisible = await homePage.isHamburgerNavigationVisible();

      expect(isDesktopNavVisible).toBe(true);
      expect(isHamburgerNavVisible).toBe(false);
    });

    test('should display profile information correctly', async () => {
      await homePage.waitForPageLoad();

      const profileName = await homePage.getProfileName();
      const isImageCircular = await homePage.isProfileImageCircular();

      expect(profileName).toBeTruthy();
      expect(isImageCircular).toBe(true);
    });

    test('should have working social media links', async () => {
      const initialWindows = await driver.getAllWindowHandles();

      await homePage.clickLinkedinLink();
      await driver.sleep(2000);

      const newWindows = await driver.getAllWindowHandles();
      expect(newWindows.length).toBeGreaterThan(initialWindows.length);
    });
  });

  describe('Mobile Navigation', () => {
    beforeEach(async () => {
      driver = await driverManager.createDriver({ viewport: MOBILE_VIEWPORT });
      homePage = new HomePage(driver);
      await homePage.navigate();
    });

    test('should display hamburger navigation on mobile', async () => {
      const isDesktopNavVisible = await homePage.isDesktopNavigationVisible();
      const isHamburgerNavVisible = await homePage.isHamburgerNavigationVisible();

      expect(isDesktopNavVisible).toBe(false);
      expect(isHamburgerNavVisible).toBe(true);
    });

    test('should open hamburger menu when clicked', async () => {
      await homePage.clickHamburgerIcon();
      await driver.sleep(1000);

      const isMenuOpen = await homePage.isHamburgerMenuOpen();
      expect(isMenuOpen).toBe(true);
    });

    test('should display circular profile image on mobile', async () => {
      const isImageCircular = await homePage.isProfileImageCircular();
      expect(isImageCircular).toBe(true);
    });
  });

  describe('Profile Buttons', () => {
    beforeEach(async () => {
      driver = await driverManager.createDriver({ viewport: DESKTOP_VIEWPORT });
      homePage = new HomePage(driver);
      await homePage.navigate();
    });

    test('should navigate to contact section when contact button clicked', async () => {
      await homePage.clickContactInfoButton();
      await driver.sleep(2000);

      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toContain('#contact');
    });

    test('should open CV when download button clicked', async () => {
      const initialWindows = await driver.getAllWindowHandles();

      await homePage.clickDownloadCvButton();
      await driver.sleep(2000);

      const newWindows = await driver.getAllWindowHandles();
      expect(newWindows.length).toBeGreaterThan(initialWindows.length);
    });
  });
});