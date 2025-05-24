const DriverManager = require('../utils/driver');
const ExperiencePage = require('../pages/ExperiencePage');
const HomePage = require('../pages/HomePage');
const TestHelpers = require('../utils/helpers');

const DESKTOP_VIEWPORT = TestHelpers.getViewportConfig('desktop');
const EXPECTED_SKILLS = {
  backend: 6,
  frontend: 6,
  testAutomation: 8
};

describe('Experience Section Tests', () => {
  let driverManager;
  let driver;
  let experiencePage;
  let homePage;

  beforeEach(async () => {
    driverManager = new DriverManager();
    driver = await driverManager.createDriver({ viewport: DESKTOP_VIEWPORT });
    experiencePage = new ExperiencePage(driver);
    homePage = new HomePage(driver);
    
    await homePage.navigate();
    await experiencePage.scrollToExperienceSection();
  });

  afterEach(async () => {
    await driverManager.quitDriver();
  });

  describe('Section Visibility', () => {
    test('should display experience section correctly', async () => {
      const isExperienceSectionVisible = await experiencePage.isExperienceSectionVisible();
      const experienceTitle = await experiencePage.getExperienceTitle();

      expect(isExperienceSectionVisible).toBe(true);
      expect(experienceTitle).toBeTruthy();
    });

    test('should display all skill containers', async () => {
      const isFrontendVisible = await experiencePage.isFrontendContainerVisible();
      const isBackendVisible = await experiencePage.isBackendContainerVisible();
      const isTestAutomationVisible = await experiencePage.isTestAutomationContainerVisible();

      expect(isFrontendVisible).toBe(true);
      expect(isBackendVisible).toBe(true);
      expect(isTestAutomationVisible).toBe(true);
    });
  });

  describe('Skills Count Validation', () => {
    test('should display correct number of frontend skills', async () => {
      const frontendSkillsCount = await experiencePage.getFrontendSkillsCount();
      expect(frontendSkillsCount).toBe(EXPECTED_SKILLS.frontend);
    });

    test('should display correct number of backend skills', async () => {
      const backendSkillsCount = await experiencePage.getBackendSkillsCount();
      expect(backendSkillsCount).toBe(EXPECTED_SKILLS.backend);
    });

    test('should display correct number of test automation skills', async () => {
      const testAutomationSkillsCount = await experiencePage.getTestAutomationSkillsCount();
      expect(testAutomationSkillsCount).toBe(EXPECTED_SKILLS.testAutomation);
    });
  });

  describe('Individual Skills Validation', () => {
    test('should display all frontend skills correctly', async () => {
      const frontendSkills = ['css', 'html', 'nextjs', 'react', 'svelte', 'tailwind'];

      for (const skill of frontendSkills) {
        const isSkillVisible = await experiencePage.isSkillVisible(skill);
        expect(isSkillVisible).toBe(true);
      }
    });

    test('should display all backend skills correctly', async () => {
      const backendSkills = ['django', 'graphql', 'mongodb', 'mysql', 'nodejs', 'prisma'];

      for (const skill of backendSkills) {
        const isSkillVisible = await experiencePage.isSkillVisible(skill);
        expect(isSkillVisible).toBe(true);
      }
    });

    test('should display all test automation skills correctly', async () => {
      const testAutomationSkills = ['appium', 'cypress', 'detox', 'javascript', 'playwright', 'python', 'selenium', 'typescript'];

      for (const skill of testAutomationSkills) {
        const isSkillVisible = await experiencePage.isSkillVisible(skill);
        expect(isSkillVisible).toBe(true);
      }
    });
  });
});