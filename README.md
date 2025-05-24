# Portfolio Selenium Testing

🚀 Automated Selenium testing suite for Pedro Robalo's portfolio website with daily monitoring and dashboard reporting.

## 📋 Overview

This project provides comprehensive automated testing for a portfolio website using Selenium WebDriver and Jest. It includes responsive design testing, navigation verification, and automated daily monitoring through GitHub Actions.

## ✨ Features

- **Cross-browser testing** with Chrome WebDriver
- **Responsive design validation** across desktop and mobile viewports
- **Page Object Model** for maintainable test structure
- **Automated daily testing** via GitHub Actions
- **Interactive dashboard** with test results and metrics
- **GitHub Pages deployment** for test reporting
- **Comprehensive test coverage** including navigation, content, and user interactions

## 🛠 Tech Stack

- **Testing Framework**: Jest
- **Browser Automation**: Selenium WebDriver
- **Browser**: Chrome (with ChromeDriver)
- **CI/CD**: GitHub Actions
- **Deployment**: GitHub Pages
- **Code Quality**: ESLint, Prettier

## 📁 Project Structure

```
selenium-portfolio-testing/
├── .github/workflows/          # GitHub Actions workflows
│   └── test-and-deploy.yml     # Daily testing and deployment
├── docs/                       # Dashboard files (GitHub Pages)
│   ├── index.html              # Test results dashboard
│   ├── script.js               # Dashboard JavaScript
│   ├── style.css               # Dashboard styling
│   └── test-results/           # Generated test reports
├── reports/                    # Test execution reports
├── src/
│   ├── pages/                  # Page Object Model classes
│   │   ├── AboutPage.js        # About page interactions
│   │   ├── ExperiencePage.js   # Experience page interactions
│   │   ├── HomePage.js         # Homepage interactions
│   │   └── ProjectPage.js      # Projects page interactions
│   ├── tests/                  # Test suites
│   │   ├── experience.test.js  # Experience page tests
│   │   ├── homepage.test.js    # Homepage tests
│   │   ├── project.test.js     # Projects page tests
│   │   └── responsive.test.js  # Responsive design tests
│   └── utils/                  # Utility classes
│       ├── driver.js           # WebDriver configuration
│       ├── helpers.js          # Test helper functions
│       └── reportGenerator.js  # Test report generator
├── package.json                # Project dependencies
└── README.md                   # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- Chrome browser (latest version)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/selenium-portfolio-testing.git
   cd selenium-portfolio-testing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npm test
   ```

## 📊 Available Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests with Jest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run generate-report` | Generate HTML test reports |
| `npm run start:dashboard` | Serve dashboard locally |
| `npm run lint` | Check code quality with ESLint |
| `npm run format` | Format code with Prettier |

## 🧪 Test Suites

### Homepage Tests (`homepage.test.js`)
- Navigation visibility across different screen sizes
- Mobile hamburger menu functionality
- Desktop navigation interactions
- Page loading and responsiveness

### Project Tests (`project.test.js`)
- Project cards display and interaction
- Project filtering and search functionality
- Project detail navigation

### Experience Tests (`experience.test.js`)
- Experience timeline display
- Work history validation
- Skills and technologies verification

### Responsive Tests (`responsive.test.js`)
- Cross-device compatibility
- Viewport-specific element visibility
- Mobile-first design validation

## 🔧 Configuration

### WebDriver Configuration

The `DriverManager` class in `src/utils/driver.js` provides:
- Chrome browser setup with optimized options
- Configurable timeouts and viewport settings
- Headless mode support for CI/CD
- Screenshot capture capabilities

### Test Environment

Tests are configured with:
- **Implicit timeout**: 10 seconds
- **Page load timeout**: 30 seconds
- **Script timeout**: 30 seconds
- **Desktop viewport**: 1920x1080
- **Mobile viewport**: 375x667

## 📈 Dashboard

The project includes an interactive dashboard that displays:
- Test execution results
- Performance metrics
- Historical trends
- Test coverage statistics

Access the dashboard at: `https://your-username.github.io/selenium-portfolio-testing`

## 🔄 Automated Testing

### GitHub Actions Workflow

The project runs automated tests:
- **Daily at midnight** (UTC)
- **On every push** to main branch
- **Manual trigger** via workflow dispatch

### Workflow Steps

1. Install dependencies
2. Run Selenium test suite
3. Generate test reports
4. Deploy dashboard to GitHub Pages

## 🐛 Troubleshooting

### Common Issues

**ChromeDriver version mismatch**
```bash
npm update chromedriver
```

**Tests failing on CI**
- Ensure headless mode is enabled
- Check viewport configurations
- Verify timeout settings

**Dashboard not updating**
- Check GitHub Pages settings
- Verify workflow permissions
- Review GitHub Actions logs

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Quality

- Follow ESLint configuration
- Use Prettier for code formatting
- Follow Page Object Model pattern
- Include test IDs (`data-test` attributes)
- Write descriptive test names

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Pedro Robalo**
- Portfolio: [pedrorobalo.dev](https://pedrorobalo.dev)
- GitHub: [@pedrorobalo](https://github.com/pedrorobalo)

## 🙏 Acknowledgments

- Selenium WebDriver team for excellent browser automation
- Jest testing framework for robust testing capabilities
- GitHub Actions for seamless CI/CD integration