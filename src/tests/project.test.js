const DriverManager = require('../utils/driver');
const HomePage = require('../pages/HomePage');
const ProjectsPage = require('../pages/ProjectsPage');
const TestHelpers = require('../utils/helpers');

const DESKTOP_VIEWPORT = TestHelpers.getViewportConfig('desktop');
const MOBILE_VIEWPORT = TestHelpers.getViewportConfig('mobile');

describe('Projects Section Tests', () => {
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

  describe('Desktop Projects Display', () => {
    beforeEach(async () => {
      driver = await driverManager.createDriver({ viewport: DESKTOP_VIEWPORT });
      homePage = new HomePage(driver);
      projectsPage = new ProjectsPage(driver);
      
      await homePage.navigate();
      await projectsPage.scrollToProjectsSection();
    });

    test('should display projects section correctly', async () => {
      const isProjectsSectionVisible = await projectsPage.isProjectsSectionVisible();
      const projectsTitle = await projectsPage.getProjectsTitle();

      expect(isProjectsSectionVisible).toBe(true);
      expect(projectsTitle).toBeTruthy();
    });

    test('should display multiple projects on desktop', async () => {
      const visibleProjectsCount = await projectsPage.getVisibleProjectsCount();
      expect(visibleProjectsCount).toBeGreaterThan(1);
    });

    test('should have pagination controls', async () => {
      const isPaginationVisible = await projectsPage.isPaginationVisible();
      expect(isPaginationVisible).toBe(true);
    });
  });

  describe('Mobile Projects Display', () => {
    beforeEach(async () => {
      driver = await driverManager.createDriver({ viewport: MOBILE_VIEWPORT });
      homePage = new HomePage(driver);
      projectsPage = new ProjectsPage(driver);
      
      await homePage.navigate();
      await projectsPage.scrollToProjectsSection();
    });

    test('should display single project on mobile', async () => {
      const visibleProjectsCount = await projectsPage.getVisibleProjectsCount();
      expect(visibleProjectsCount).toBe(1);
    });

    test('should have navigation arrows on mobile', async () => {
      const areNavigationButtonsVisible = await projectsPage.isNavigationButtonsVisible();
      expect(areNavigationButtonsVisible).toBe(true);
    });

    test('should navigate between projects using arrows', async () => {
      const isFirstProjectVisible = await projectsPage.isProjectSlideVisible(1);
      expect(isFirstProjectVisible).toBe(true);

      await projectsPage.clickNextButton();

      const isSecondProjectVisible = await projectsPage.isProjectSlideVisible(2);
      expect(isSecondProjectVisible).toBe(true);

      await projectsPage.clickPrevButton();

      const isFirstProjectVisibleAgain = await projectsPage.isProjectSlideVisible(1);
      expect(isFirstProjectVisibleAgain).toBe(true);
    });
  });

  describe('Project Interaction', () => {
    beforeEach(async () => {
      driver = await driverManager.createDriver({ viewport: DESKTOP_VIEWPORT });
      homePage = new HomePage(driver);
      projectsPage = new ProjectsPage(driver);
      
      await homePage.navigate();
      await projectsPage.scrollToProjectsSection();
    });

    test('should open new window when GitHub button clicked', async () => {
      const initialWindows = await driver.getAllWindowHandles();

      await projectsPage.clickProjectGithubButton(1);
      await driver.sleep(2000);

      const newWindows = await driver.getAllWindowHandles();
      expect(newWindows.length).toBeGreaterThan(initialWindows.length);
    });

    test('should open new window when demo button clicked', async () => {
      const initialWindows = await driver.getAllWindowHandles();

      await projectsPage.clickProjectDemoButton(1);
      await driver.sleep(2000);

      const newWindows = await driver.getAllWindowHandles();
      expect(newWindows.length).toBeGreaterThan(initialWindows.length);
    });
  });
});