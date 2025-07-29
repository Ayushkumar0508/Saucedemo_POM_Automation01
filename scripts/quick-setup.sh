#!/bin/bash
cd "$(dirname "$0")/.."
set -e

echo "[INFO] Starting quick setup for Saucedemo_POM_Automation01..."
if ! command -v npm > /dev/null; then
  echo "[ERROR] npm is not installed."; exit 1
fi

if ! command -v npx > /dev/null; then
  echo "[ERROR] npx is not installed."; exit 1
fi

npm install
npx playwright install --with-deps chromium firefox

echo "[INFO] Running Playwright tests in parallel (2 workers, chromium & firefox)..."
npx playwright test --reporter=html --workers=2

if [ -d "playwright-report" ]; then
  npx playwright show-report
echo "[INFO] HTML report auto-opened."
else
  echo "[ERROR] No playwright-report directory found! Tests may not have run."
  exit 2
fi

echo "[SUCCESS] Quick setup, execution, and reporting complete."
