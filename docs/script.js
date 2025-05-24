class TestDashboard {
    constructor() {
        this.testResults = [];
        this.initializeDashboard();
    }

    async initializeDashboard() {
        await this.loadTestResults();
        this.updateMetrics();
        this.renderCharts();
        this.renderTestResultsTable();
    }

    async loadTestResults() {
        try {
            const response = await fetch('./test-results/latest.json');
            this.testResults = await response.json();
        } catch (error) {
            console.error('Failed to load test results:', error);
            this.testResults = this.getMockData();
        }
    }

    updateMetrics() {
        const passedTests = this.testResults.filter(test => test.status === 'passed');
        const failedTests = this.testResults.filter(test => test.status === 'failed');
        const successRate = ((passedTests.length / this.testResults.length) * 100).toFixed(1);

        document.getElementById('totalTests').textContent = this.testResults.length;
        document.getElementById('passedTests').textContent = passedTests.length;
        document.getElementById('failedTests').textContent = failedTests.length;
        document.getElementById('successRate').textContent = `${successRate}%`;
    }

    renderCharts() {
        this.renderTestResultsChart();
        this.renderBrowserChart();
    }

    renderTestResultsChart() {
        const ctx = document.getElementById('testResultsChart').getContext('2d');
        const chartData = this.processTimeSeriesData();

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Passed Tests',
                    data: chartData.passed,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.1
                }, {
                    label: 'Failed Tests',
                    data: chartData.failed,
                    borderColor: '#f44336',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    renderBrowserChart() {
        const ctx = document.getElementById('browserChart').getContext('2d');
        const browserData = this.processBrowserData();

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: browserData.labels,
                datasets: [{
                    data: browserData.values,
                    backgroundColor: [
                        '#4CAF50',
                        '#2196F3',
                        '#FF9800',
                        '#9C27B0'
                    ]
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    renderTestResultsTable() {
        const tbody = document.getElementById('testResultsBody');
        const testSuites = this.groupTestsBySuite();

        tbody.innerHTML = Object.keys(testSuites).map(suiteName => {
            const suite = testSuites[suiteName];
            const statusClass = suite.status === 'passed' ? 'success' : 'error';
            
            return `
                <tr data-test="test-suite-row">
                    <td>${suiteName}</td>
                    <td><span class="status ${statusClass}">${suite.status}</span></td>
                    <td>${suite.duration}ms</td>
                    <td>${new Date(suite.lastRun).toLocaleString()}</td>
                    <td>
                        <button class="btn btn-small" 
                                onclick="viewDetails('${suiteName}')"
                                data-test="view-details-button">View Details</button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    getMockData() {
        return [
            { name: 'Homepage Navigation', status: 'passed', duration: 1200, suite: 'navigation', lastRun: new Date() },
            { name: 'Mobile Responsive', status: 'passed', duration: 2300, suite: 'responsive', lastRun: new Date() },
            { name: 'Projects Carousel', status: 'passed', duration: 1800, suite: 'projects', lastRun: new Date() },
            { name: 'Contact Form', status: 'failed', duration: 900, suite: 'contact', lastRun: new Date() }
        ];
    }

    processTimeSeriesData() {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toLocaleDateString();
        }).reverse();

        return {
            labels: last7Days,
            passed: [15, 16, 14, 18, 17, 19, 18],
            failed: [2, 1, 3, 1, 2, 0, 1]
        };
    }

    processBrowserData() {
        return {
            labels: ['Chrome', 'Firefox', 'Safari', 'Edge'],
            values: [85, 10, 3, 2]
        };
    }

    groupTestsBySuite() {
        const suites = {};
        this.testResults.forEach(test => {
            if (!suites[test.suite]) {
                suites[test.suite] = {
                    status: 'passed',
                    duration: 0,
                    lastRun: test.lastRun,
                    tests: []
                };
            }
            suites[test.suite].tests.push(test);
            suites[test.suite].duration += test.duration;
            if (test.status === 'failed') {
                suites[test.suite].status = 'failed';
            }
        });
        return suites;
    }
}

function viewDetails(suiteName) {
    alert(`Viewing details for ${suiteName} test suite`);
}

document.addEventListener('DOMContentLoaded', () => {
    new TestDashboard();
});