# Saucedemo Playwright POM Automation Framework

## Overview
Production-grade Page Object Model (POM) automation framework for [saucedemo.com](https://www.saucedemo.com) using Playwright. Multi-browser (Chromium, Firefox) support, robust logging, reporting, artifacts for reproducibility, and fully deterministic execution.

---

## 📦 Installation & Setup

```bash
./scripts/quick-setup.sh
```

- Installs all dependencies
- Installs supported Playwright browsers (Chromium, Firefox)
- Validates environment, then runs all tests in parallel and opens the HTML report

---

## 🏗️ Project Structure
```
pages/
    ProductListingPage.js
tests/
    product-listing-checkout.test.js
data/
    TestData.js
utils/
    TestUtils.js
scripts/
    quick-setup.sh
    run-parallel.sh
    run-sequential.sh
    validate-setup.sh
playwright.config.js
package.json
.gitignore
README.md
```

## 🚀 Quick Start

1. Clone the repo
2. Run `./scripts/quick-setup.sh` (Linux/macOS) — installs, validates, tests, opens report

## 🖥️ Execution Modes
- **Parallel**: `./scripts/run-parallel.sh`
- **Sequential (debug)**: `./scripts/run-sequential.sh`
- **Validate Project**: `./scripts/validate-setup.sh`

## 📊 Artifacts
- Screenshots for Chromium/Firefox: `logged-in-chromium.png`, `logged-in-firefox.png`
- Video for failures (see [videos](https://playwright.dev/docs/videos))
- HTML report auto-opens after run

## 🧩 Architecture
- Fully Page Object Model (POM) with inheritance
- Deterministic execution: fixed data, seed; reproducible artifacts
- Step-by-step logging: each step logs intent, action, observed result, browser context
- Multi-browser, headed mode (for debugging/visibility)
- Strict SOLID principles; easily extensible/maintainable

## 🔒 Robustness Features
- Error handling and retry built-in
- Clean browser state for every test
- Explicit waits only (no time-based flakiness)
- All test/workers/config outside describe blocks [see [Playwright config docs](https://playwright.dev/docs/test-configuration)]

## 🛠️ Extending Framework
- Add new Page Object in `/pages`
- Create new test under `/tests`
- Add test data/utils in `/data` `/utils`

## ❓ Troubleshooting
- "No tests found": ensure you run scripts **from the project root** (the scripts do this automatically)
- Permission errors: add executable bit to scripts (`chmod +x scripts/*.sh`)
- Check report output in `playwright-report/`
- Playwright dependency issues: run `npx playwright install`

## 📝 References
- [Playwright Docs](https://playwright.dev/)
- [POM Design](https://martinfowler.com/bliki/PageObject.html)