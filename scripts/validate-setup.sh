#!/bin/bash
cd "$(dirname \"$0\")/.."
set -e

echo "[INFO] Validating system and project configuration..."

if ! command -v npm > /dev/null; then
  echo "[ERROR] npm is not installed."; exit 1
fi

if ! command -v npx > /dev/null; then
  echo "[ERROR] npx is not installed."; exit 1
fi

npm install
npx playwright install --with-deps chromium firefox

echo "[INFO] Listing Playwright browsers installed..."
npx playwright install --list

echo "[INFO] Discovering tests in ./tests..."
npx playwright test --list

echo "[SUCCESS] Validation complete. System and project PASS."
