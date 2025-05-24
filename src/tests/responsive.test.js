const DriverManager = require('../utils/driver');
const HomePage = require('../pages/HomePage');
const ProjectsPage = require('../pages/ProjectsPage');
const TestHelpers = require('../utils/helpers');

const DESKTOP_VIEWPORT = TestHelpers.getViewportConfig('desktop');
const IPHONE_VIEWPORT = TestHelpers.getViewportConfig('iphone12ProMax');
const MOBILE_VIEWPORT = TestHelpers.getViewportConfig('mobile');
const TABLET_VIEWPORT = TestHelpers.getViewportConfig('tablet');

describe('Responsive Design Tests', () => {
  let driverManager;
  let driver;
  let homePage;
  let projectsPage;

  beforeEach(async () => {
    driverManager = new DriverManager();
  });

  afterEach(async () => {
    await driverManager.quitDriver();
  });

  describe('Profile Section Responsiveness', () => {
    test('should display circular profile image on iPhone 12 Pro Max', async () => {
      driver = await driverManager.createDriver({ viewport: IPHONE_VIEWPORT });
      homePage = new HomePage(driver);
      
      await homePage.navigate();
      await homePage.waitForPageLoad();

      const borderRadius = await homePage.getProfileImageBorderRadius();
      const isCircular = await homePage.isProfileImageCircular();

      expect(borderRadius).toBe('50%');
      expect(isCircular).toBe(true);
    });

    test('should maintain circular image across all device sizes', async () => {
      const viewports = [DESKTOP_VIEWPORT, TABLET_VIEWPORT, MOBILE_VIEWPORT, IPHONE_VIEWPORT];

      for (const viewport of viewports) {
        driver = await driverManager.createDriver({ viewport });
        homePage = new HomePage(driver);
        
        await homePage.navigate();
        await homePage.waitForPageLoad();

        const isCircular = await homePage.isProfileImageCircular();
        expect(isCircular).toBe(true);

        await driverManager.quitDriver();
      }
    });
  });

  describe('Projects Section Responsiveness', () => {
    test('should show single project on mobile devices', async () => {
      driver = await driverManager.createDriver({ viewport: MOBILE_VIEWPORT });
      homePage = new HomePage(driver);
      projectsPage = new ProjectsPage(driver);
      
      await homePage.navigate();
      await projectsPage.scrollToProjectsSection();

      const visibleProjectsCount = await projectsPage.getVisibleProjectsCount();
      const areNavigationButtonsVisible = await projectsPage.isNavigationButtonsVisible();

      expect(visibleProjectsCount).toBe(1);
      expect(areNavigationButtonsVisible).toBe(true);
    });

    test('should show multiple projects on desktop', async () => {
      driver = await driverManager.createDriver({ viewport: DESKTOP_VIEWPORT });
      homePage = new HomePage(driver);
      projectsPage = new ProjectsPage(driver);
      
      await homePage.navigate();
      await projectsPage.scrollToProjectsSection();

      const visibleProjectsCount = await projectsPage.getVisibleProjectsCount();
      expect(visibleProjectsCount).toBeGreaterThan(1);
    });

    test('should allow navigation between projects on mobile', async () => {
      driver = await driverManager.createDriver({ viewport: MOBILE_VIEWPORT });
      homePage = new HomePage(driver);
      projectsPage = new ProjectsPage(driver);
      
      await homePage.navigate();
      await projectsPage.scrollToProjectsSection();

      const initialProject = await projectsPage.isProjectSlideVisible(1);
      expect(initialProject).toBe(true);

      await projectsPage.clickNextButton();

      const nextProject = await projectsPage.isProjectSlideVisible(2);
      expect(nextProject).toBe(true);
    });
  });

  describe('Navigation Responsiveness', () => {
    test('should show desktop navigation on large screens', async () => {
      driver = await driverManager.createDriver({ viewport: DESKTOP_VIEWPORT });
      homePage = new HomePage(driver);
      
      await homePage.navigate();

      const isDesktopNavVisible = await homePage.isDesktopNavigationVisible();
      const isHamburgerNavVisible = await homePage.isHamburgerNavigationVisible();

      expect(isDesktopNavVisible).toBe(true);
      expect(isHamburgerNavVisible).toBe(false);
    });

    test('should show hamburger navigation on mobile screens', async () => {
      const mobileViewports = [MOBILE_VIEWPORT, IPHONE_VIEWPORT];

      for (const viewport of mobileViewports) {
        driver = await driverManager.createDriver({ viewport });
        homePage = new HomePage(driver);
        
        await homePage.navigate();

        const isDesktopNavVisible = await homePage.isDesktopNavigationVisible();
        const isHamburgerNavVisible = await homePage.isHamburgerNavigationVisible();

        expect(isDesktopNavVisible).toBe(false);
        expect(isHamburgerNavVisible).toBe(true);

        await driverManager.quitDriver();
      }
    });
  });
});