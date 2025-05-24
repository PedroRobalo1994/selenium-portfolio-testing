const { By } = require('selenium-webdriver');
const TestHelpers = require('../utils/helpers');

const SELECTORS = {
  projectsCarousel: '[data-test="projects-carousel"]',
  projectsNextButton: '[data-test="projects-next-button"]',
  projectsPagination: '[data-test="projects-pagination"]',
  projectsPrevButton: '[data-test="projects-prev-button"]',
  projectsSection: '[data-test="projects-section"]',
  projectsSubtitle: '[data-test="projects-subtitle"]',
  projectsTitle: '[data-test="projects-title"]',
  projectsWrapper: '[data-test="projects-wrapper"]'
};

const PROJECT_SELECTORS = {
  projectOneContainer: '[data-test="project-1-container"]',
  projectOneDemoButton: '[data-test="project-1-demo-button"]',
  projectOneGithubButton: '[data-test="project-1-github-button"]',
  projectOneSlide: '[data-test="project-1-slide"]',
  projectTwoContainer: '[data-test="project-2-container"]',
  projectTwoDemoButton: '[data-test="project-2-demo-button"]',
  projectTwoGithubButton: '[data-test="project-2-github-button"]',
  projectTwoSlide: '[data-test="project-2-slide"]'
};

class ProjectsPage {
  constructor(driver) {
    this.driver = driver;
  }

  async clickNextButton() {
    const button = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.projectsNextButton));
    await button.click();
    await this.driver.sleep(1000);
  }

  async clickPrevButton() {
    const button = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.projectsPrevButton));
    await button.click();
    await this.driver.sleep(1000);
  }

  async clickProjectDemoButton(projectNumber) {
    const selector = PROJECT_SELECTORS[`project${this.getProjectWord(projectNumber)}DemoButton`];
    const button = await TestHelpers.waitForElementVisible(this.driver, By.css(selector));
    await button.click();
  }

  async clickProjectGithubButton(projectNumber) {
    const selector = PROJECT_SELECTORS[`project${this.getProjectWord(projectNumber)}GithubButton`];
    const button = await TestHelpers.waitForElementVisible(this.driver, By.css(selector));
    await button.click();
  }

  async getProjectsTitle() {
    const element = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.projectsTitle));
    return await element.getText();
  }

  getProjectWord(number) {
    const words = ['', 'One', 'Two', 'Three', 'Four', 'Five'];
    return words[number] || 'One';
  }

  async getVisibleProjectsCount() {
    const slides = await this.driver.findElements(By.css('[data-test*="project-"][data-test*="-slide"]'));
    let visibleCount = 0;
    
    for (const slide of slides) {
      if (await slide.isDisplayed()) {
        visibleCount++;
      }
    }
    
    return visibleCount;
  }

  async isNavigationButtonsVisible() {
    const nextVisible = await TestHelpers.isElementVisible(this.driver, By.css(SELECTORS.projectsNextButton));
    const prevVisible = await TestHelpers.isElementVisible(this.driver, By.css(SELECTORS.projectsPrevButton));
    return nextVisible && prevVisible;
  }

  async isPaginationVisible() {
    return await TestHelpers.isElementVisible(this.driver, By.css(SELECTORS.projectsPagination));
  }

  async isProjectSlideVisible(projectNumber) {
    const selector = PROJECT_SELECTORS[`project${this.getProjectWord(projectNumber)}Slide`];
    return await TestHelpers.isElementVisible(this.driver, By.css(selector));
  }

  async isProjectsSectionVisible() {
    return await TestHelpers.isElementVisible(this.driver, By.css(SELECTORS.projectsSection));
  }

  async scrollToProjectsSection() {
    const section = await TestHelpers.waitForElementVisible(this.driver, By.css(SELECTORS.projectsSection));
    await TestHelpers.scrollToElement(this.driver, section);
  }
}

module.exports = ProjectsPage;