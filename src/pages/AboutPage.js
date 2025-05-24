const { By } = require('selenium-webdriver');
const TestHelpers = require('../utils/helpers');

const SELECTORS = {
  aboutDescription: '[data-test="about-description"]',
  aboutSection: '[data-test="about-section"]',
  aboutSubtitle: '[data-test="about-subtitle"]',
  aboutTitle: '[data-test="about-title"]',
  educationIcon: '[data-test="education-icon"]',
  educationInfoCard: '[data-test="education-info-card"]',
  educationText: '[data-test="education-text"]',
  educationTitle: '[data-test="education-title"]',
  experienceIcon: '[data-test="experience-icon"]',
  experienceInfoCard: '[data-test="experience-info-card"]',
  experienceText: '[data-test="experience-text"]',
  experienceTitle: '[data-test="experience-title"]'
};

class AboutPage {
  constructor(driver) {
    this.driver = driver;
  }

  async getAboutDescription() {
    const element = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.aboutDescription));
    return await element.getText();
  }

  async getAboutTitle() {
    const element = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.aboutTitle));
    return await element.getText();
  }

  async getEducationText() {
    const element = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.educationText));
    return await element.getText();
  }

  async getExperienceText() {
    const element = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.experienceText));
    return await element.getText();
  }

  async isAboutSectionVisible() {
    return await TestHelpers.isElementVisible(this.driver, By.css(SELECTORS.aboutSection));
  }

  async isEducationCardVisible() {
    return await TestHelpers.isElementVisible(this.driver, By.css(SELECTORS.educationInfoCard));
  }

  async isExperienceCardVisible() {
    return await TestHelpers.isElementVisible(this.driver, By.css(SELECTORS.experienceInfoCard));
  }

  async scrollToAboutSection() {
    const section = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.aboutSection));
    await TestHelpers.scrollToElement(this.driver, section);
  }
}

module.exports = AboutPage;