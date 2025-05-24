const { By, until } = require('selenium-webdriver');
const TestHelpers = require('../utils/helpers');

const BASE_URL = 'https://pedrorobalo1994.github.io/vanila-portfolio';

const SELECTORS = {
  contactInfoButton: '[data-test="contact-info-button"]',
  desktopNavigation: '[data-test="desktop-navigation"]',
  downloadCvButton: '[data-test="download-cv-button"]',
  githubLink: '[data-test="github-link"]',
  hamburgerIcon: '[data-test="hamburger-icon"]',
  hamburgerMenuLinks: '[data-test="hamburger-menu-links"]',
  hamburgerNavigation: '[data-test="hamburger-navigation"]',
  linkedinLink: '[data-test="linkedin-link"]',
  profileGreeting: '[data-test="profile-greeting"]',
  profileImage: '[data-test="profile-image"]',
  profileName: '[data-test="profile-name"]',
  profileSection: '[data-test="profile-section"]',
  profileTitle: '[data-test="profile-title"]',
  socialLinks: '[data-test="social-links"]'
};

class HomePage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigate() {
    await this.driver.get(BASE_URL);
    await this.driver.wait(until.elementLocated(By.css(SELECTORS.profileSection)), 10000);
  }

  async clickContactInfoButton() {
    const button = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.contactInfoButton));
    await button.click();
  }

  async clickDownloadCvButton() {
    const button = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.downloadCvButton));
    await button.click();
  }

  async clickGithubLink() {
    const link = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.githubLink));
    await link.click();
  }

  async clickHamburgerIcon() {
    const icon = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.hamburgerIcon));
    await icon.click();
  }

  async clickLinkedinLink() {
    const link = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.linkedinLink));
    await link.click();
  }

  async getProfileImageBorderRadius() {
    const image = await this.getProfileImageElement();
    return await image.getCssValue('border-radius');
  }

  async getProfileImageElement() {
    return await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.profileImage));
  }

  async getProfileName() {
    const nameElement = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.profileName));
    return await nameElement.getText();
  }

  async isDesktopNavigationVisible() {
    return await TestHelpers.isElementVisible(this.driver, By.css(SELECTORS.desktopNavigation));
  }

  async isHamburgerMenuOpen() {
    try {
      const menuLinks = await this.driver.findElement(By.css(SELECTORS.hamburgerMenuLinks));
      const classes = await menuLinks.getAttribute('class');
      return classes.includes('open');
    } catch (error) {
      return false;
    }
  }

  async isHamburgerNavigationVisible() {
    return await TestHelpers.isElementVisible(this.driver, By.css(SELECTORS.hamburgerNavigation));
  }

  async isProfileImageCircular() {
    const borderRadius = await this.getProfileImageBorderRadius();
    return borderRadius === '50%';
  }

  async waitForPageLoad() {
    await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.profileSection));
    await this.driver.sleep(2000);
  }
}

module.exports = HomePage;