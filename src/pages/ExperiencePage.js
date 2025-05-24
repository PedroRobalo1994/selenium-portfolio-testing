const { By } = require('selenium-webdriver');
const TestHelpers = require('../utils/helpers');

const SELECTORS = {
  backendSkillsContainer: '[data-test="backend-skills-container"]',
  backendTitle: '[data-test="backend-title"]',
  experienceSection: '[data-test="experience-section"]',
  experienceSubtitle: '[data-test="experience-subtitle"]',
  experienceTitle: '[data-test="experience-title"]',
  frontendSkillsContainer: '[data-test="frontend-skills-container"]',
  frontendTitle: '[data-test="frontend-title"]',
  testAutomationSkillsContainer: '[data-test="test-automation-skills-container"]',
  testAutomationTitle: '[data-test="test-automation-title"]'
};

const SKILL_SELECTORS = {
  appiumSkill: '[data-test="appium-skill"]',
  cssSkill: '[data-test="css-skill"]',
  cypressSkill: '[data-test="cypress-skill"]',
  detoxSkill: '[data-test="detox-skill"]',
  djangoSkill: '[data-test="django-skill"]',
  graphqlSkill: '[data-test="graphql-skill"]',
  htmlSkill: '[data-test="html-skill"]',
  javascriptSkill: '[data-test="javascript-skill"]',
  mongodbSkill: '[data-test="mongodb-skill"]',
  mysqlSkill: '[data-test="mysql-skill"]',
  nextjsSkill: '[data-test="nextjs-skill"]',
  nodejsSkill: '[data-test="nodejs-skill"]',
  playwrightSkill: '[data-test="playwright-skill"]',
  prismaSkill: '[data-test="prisma-skill"]',
  pythonSkill: '[data-test="python-skill"]',
  reactSkill: '[data-test="react-skill"]',
  seleniumSkill: '[data-test="selenium-skill"]',
  svelteSkill: '[data-test="svelte-skill"]',
  tailwindSkill: '[data-test="tailwind-skill"]',
  typescriptSkill: '[data-test="typescript-skill"]'
};

class ExperiencePage {
  constructor(driver) {
    this.driver = driver;
  }

  async getAllSkillElements() {
    const skillElements = [];
    
    for (const skillSelector of Object.values(SKILL_SELECTORS)) {
      try {
        const element = await this.driver.findElement(By.css(skillSelector));
        if (await element.isDisplayed()) {
          skillElements.push(element);
        }
      } catch (error) {
        console.warn(`Skill element ${skillSelector} not found`);
      }
    }
    
    return skillElements;
  }

  async getBackendSkillsCount() {
    const container = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.backendSkillsContainer));
    const skills = await container.findElements(By.css('[data-test*="-skill"]'));
    return skills.length;
  }

  async getExperienceTitle() {
    const element = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.experienceTitle));
    return await element.getText();
  }

  async getFrontendSkillsCount() {
    const container = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.frontendSkillsContainer));
    const skills = await container.findElements(By.css('[data-test*="-skill"]'));
    return skills.length;
  }

  async getTestAutomationSkillsCount() {
    const container = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.testAutomationSkillsContainer));
    const skills = await container.findElements(By.css('[data-test*="-skill"]'));
    return skills.length;
  }

  async isBackendContainerVisible() {
    return await TestHelpers.isElementVisible(this.driver, By.css(SELECTORS.backendSkillsContainer));
  }

  async isExperienceSectionVisible() {
    return await TestHelpers.isElementVisible(this.driver, By.css(SELECTORS.experienceSection));
  }

  async isFrontendContainerVisible() {
    return await TestHelpers.isElementVisible(this.driver, By.css(SELECTORS.frontendSkillsContainer));
  }

  async isSkillVisible(skillName) {
    const selector = SKILL_SELECTORS[`${skillName}Skill`];
    if (!selector) {
      throw new Error(`Skill selector for ${skillName} not found`);
    }
    return await TestHelpers.isElementVisible(this.driver, By.css(selector));
  }

  async isTestAutomationContainerVisible() {
    return await TestHelpers.isElementVisible(this.driver, By.css(SELECTORS.testAutomationSkillsContainer));
  }

  async scrollToExperienceSection() {
    const section = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.experienceSection));
    await TestHelpers.scrollToElement(this.driver, section);
  }
}

module.exports = ExperiencePage;