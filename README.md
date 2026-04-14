
# Test Suite for Multiplication Utility

This directory contains comprehensive test coverage for the Multiplication Utility project, including unit tests and end-to-end tests.

## Test Structure

```
test/
├── tests/
│   ├── unit/                     # Vitest unit tests for JavaScript logic
│   │   └── script.spec.ts        # Tests for script.js DOM manipulation and logic
│   ├── e2e/                      # Playwright E2E tests for browser flows
│   │   └── multiplication-flow.spec.ts
│   ├── package.json              # Test dependencies
│   ├── playwright.config.ts      # Playwright configuration
│   ├── vitest.config.ts          # Vitest configuration
│   └── .gitignore
└── README.md                     # This file
```

## Tech Stack Detection

**Detected Layers:**
- **Frontend:** HTML5 + CSS3 + Vanilla JavaScript ES6+ (static single-page application)
- **Backend:** None (zero-backend architecture per requirements)

**Testing Frameworks Selected:**
- **Unit Tests:** Vitest + @testing-library/dom + JSDOM
- **E2E Tests:** @playwright/test (browser automation)

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## Installation

Navigate to the test directory and install dependencies:

```bash
cd test/tests
npm install
```

Install Playwright browsers (first time only):

```bash
npm run playwright:install
```

## Running Tests

### Unit Tests

Run all unit tests once:
```bash
npm run test:unit
```

Run unit tests in watch mode (auto-rerun on file changes):
```bash
npm run test:unit:watch
```

Generate coverage report:
```bash
npm run test:unit:coverage
```
Coverage report will be generated in `test/coverage/` directory.

### E2E Tests

Run all E2E tests (headless):
```bash
npm run test:e2e
```

Run E2E tests with UI mode (interactive browser):
```bash
npm run test:e2e:ui
```

Run E2E tests with headed browsers (visible):
```bash
npm run test:e2e:headed
```

Debug E2E tests (step through with inspector):
```bash
npm run test:e2e:debug
```

### Run All Tests

Run both unit and E2E tests sequentially:
```bash
npm run test:all
```

## Test Coverage

### Unit Tests (`test/tests/unit/script.spec.ts`)

**DOM Element Initialization:**
- ✓ Renders two numeric input fields on page load
- ✓ Renders a submit button labeled "Submit"
- ✓ Result field is hidden on initial page load
- ✓ Error message field is hidden on initial page load
- ✓ All required ARIA labels for accessibility are present

**Input Validation:**
- ✓ Shows error when both fields are empty
- ✓ Shows error when first field is empty
- ✓ Shows error when second field is empty
- ✓ Shows error when fields contain non-numeric values
- ✓ Clears error message when user starts typing

**Multiplication Logic:**
- ✓ Calculates product of two positive integers correctly
- ✓ Calculates product of two decimal numbers correctly
- ✓ Calculates product with negative numbers correctly
- ✓ Calculates product of two negative numbers correctly
- ✓ Handles multiplication by zero correctly
- ✓ Handles very large numbers correctly
- ✓ Handles very small decimal numbers correctly

**Result Display Behavior:**
- ✓ Shows result field after successful calculation
- ✓ Updates result when inputs change and Submit is clicked again
- ✓ Hides result field when error is displayed

**Keyboard Navigation:**
- ✓ Triggers calculation when Enter is pressed in first input field
- ✓ Triggers calculation when Enter is pressed in second input field

**Edge Cases:**
- ✓ Handles whitespace in input values
- ✓ Handles leading zeros in input values
- ✓ Handles scientific notation input

**Accessibility Features:**
- ✓ Creates ARIA live region for screen reader announcements
- ✓ Announces result to screen readers after calculation
- ✓ Announces errors to screen readers

**Performance Requirements:**
- ✓ Calculates and renders result in under 100ms (NFR-002)

### E2E Tests (`test/tests/e2e/multiplication-flow.spec.ts`)

**Page Load and Initial State:**
- ✓ Loads the page with correct title
- ✓ Displays header with correct text
- ✓ Renders exactly two numeric input fields (FR-001)
- ✓ Renders Submit button (FR-002)
- ✓ Hides result field on initial load (FR-003)
- ✓ Hides error message on initial load
- ✓ Displays footer with copyright notice

**User Interaction - Valid Inputs:**
- ✓ Calculates product of two positive integers
- ✓ Calculates product of decimal numbers
- ✓ Calculates product with negative numbers
- ✓ Calculates product of two negative numbers
- ✓ Handles multiplication by zero
- ✓ Handles very large numbers

**User Interaction - Invalid Inputs:**
- ✓ Shows error when both fields are empty
- ✓ Shows error when first field is empty
- ✓ Shows error when second field is empty
- ✓ Clears error message when user starts typing

**Result Update Behavior:**
- ✓ Updates result when inputs change and Submit is clicked again (FR-003)
- ✓ Hides result and shows error when valid calculation is followed by invalid input

**Keyboard Navigation:**
- ✓ Calculates when Enter is pressed in first input field
- ✓ Calculates when Enter is pressed in second input field
- ✓ Able to tab through all interactive elements
- ✓ Submits via keyboard when button is focused

**Accessibility:**
- ✓ Has proper ARIA labels on inputs (NFR-001)
- ✓ Has labels associated with inputs
- ✓ Has required attribute on inputs

**Visual Regression:**
- ✓ Renders page correctly on desktop viewport (1280x720)
- ✓ Renders page correctly on mobile viewport (375x667)
- ✓ Renders result state correctly
- ✓ Renders error state correctly

**Performance:**
- ✓ Loads page in under 1 second
- ✓ Renders result in under 100ms after button click (NFR-002)

**Complete User Flows:**
- ✓ Completes full calculation flow successfully (FR-001 → FR-002 → FR-003)
- ✓ Completes error recovery flow successfully
- ✓ Completes recalculation flow successfully

**Edge Cases:**
- ✓ Handles extremely large numbers
- ✓ Handles very small decimal numbers
- ✓ Handles leading zeros
- ✓ Handles scientific notation

## Requirements Coverage Matrix

| Requirement ID | Description | Test Coverage |
|----------------|-------------|---------------|
| **BR-001** | Minimal scope single-page utility | ✓ All tests verify single HTML file behavior |
| **FR-001** | Two numeric input fields display | ✓ Unit + E2E tests verify field presence and type |
| **FR-002** | Submit button triggers multiplication | ✓ Unit + E2E tests verify button click behavior |
| **FR-003** | Product result field appears dynamically | ✓ Unit + E2E tests verify dynamic result rendering |
| **FR-004** | Pure frontend implementation only | ✓ All tests run client-side, zero network requests |
| **NFR-001** | Simple and clean UI design | ✓ E2E visual regression tests verify layout |
| **NFR-002** | Instant client-side performance | ✓ Performance tests verify < 100ms rendering |

## Test Reports

### Unit Test Coverage

After running `npm run test:unit:coverage`, open the coverage report:

```bash
open ../coverage/index.html
```

Expected coverage: **100%** for `script.js` (all statements, branches, functions, and lines).

### E2E Test Report

After running `npm run test:e2e`, open the HTML report:

```bash
npx playwright show-report ../playwright-report
```

The report includes:
- Test results for all browsers (Chrome, Firefox, Safari, Mobile)
- Screenshots of failures
- Video recordings of failures
- Execution traces for debugging

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        working-directory: ./test/tests
        run: npm ci
      
      - name: Install Playwright browsers
        working-directory: ./test/tests
        run: npx playwright install --with-deps
      
      - name: Run unit tests
        working-directory: ./test/tests
        run: npm run test:unit:coverage
      
      - name: Run E2E tests
        working-directory: ./test/tests
        run: npm run test:e2e
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          files: ./test/coverage/lcov.info
      
      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: test/playwright-report/
```

## Debugging Failed Tests

### Unit Tests

1. Run in watch mode to see real-time failures:
   ```bash
   npm run test:unit:watch
   ```

2. Add `console.log()` statements in the test file or source code

3. Use Vitest UI for visual debugging:
   ```bash
   npx vitest --ui
   ```

### E2E Tests

1. Run with visible browser:
   ```bash
   npm run test:e2e:headed
   ```

2. Use Playwright Inspector:
   ```bash
   npm run test:e2e:debug
   ```

3. View screenshots and videos in `test-results/` directory after failures

4. Use Playwright trace viewer for deep debugging:
   ```bash
   npx playwright show-trace test-results/.../trace.zip
   ```

## Writing New Tests

### Adding a Unit Test

Create a new file in `test/tests/unit/` with the pattern `*.spec.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('New Feature Tests', () => {
  let dom: JSDOM;
  let document: Document;

  beforeEach(() => {
    // Setup DOM environment
    const html = `<!DOCTYPE html>...`;
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    document = dom.window.document;
  });

  it('should test specific behavior', () => {
    // Arrange
    const element = document.getElementById('someId');
    
    // Act
    element?.click();
    
    // Assert
    expect(element?.textContent).toBe('expected value');
  });
});
```

### Adding an E2E Test

Add test cases to `test/tests/e2e/multiplication-flow.spec.ts` or create a new file:

```typescript
import { test, expect } from '@playwright/test';

test('should complete new user flow', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Interact with page
  await page.locator('#someElement').click();
  
  // Verify behavior
  await expect(page.locator('#result')).toHaveText('expected');
});
```

## Best Practices

1. **Test Isolation:** Each test should be independent and not rely on other tests
2. **Descriptive Names:** Use clear, descriptive test names that explain what is being tested
3. **Arrange-Act-Assert:** Structure tests with clear setup, action, and verification phases
4. **Avoid Hardcoded Waits:** Use Playwright's auto-waiting instead of `setTimeout()`
5. **Clean Up:** Always clean up resources in `afterEach()` hooks
6. **Accessibility:** Include accessibility tests (ARIA labels, keyboard navigation)
7. **Performance:** Test non-functional requirements like render time
8. **Edge Cases:** Test boundary conditions, empty inputs, very large numbers, etc.

## Troubleshooting

### "Cannot find module" errors
```bash
cd test/tests
rm -rf node_modules package-lock.json
npm install
```

### Playwright browsers not found
```bash
npm run playwright:install
```

### Tests fail locally but pass in CI
- Check Node.js version matches CI environment
- Ensure browser versions are up to date
- Verify environment variables are set correctly

### Slow test execution
- Use `test.describe.configure({ mode: 'parallel' })` for parallel execution
- Reduce `retries` in playwright.config.ts during local development
- Use `--workers` flag to control parallelism

## Performance Benchmarks

Expected test execution times:

- **Unit Tests:** < 5 seconds (all tests)
- **E2E Tests:** < 2 minutes (all browsers and devices)
- **Total Test Suite:** < 3 minutes

## License

This test suite is part of the Multiplication Utility project and follows the same license.

---

**Test Coverage:** 100% of requirements  
**Test Automation:** Fully automated  
**CI/CD Ready:** Yes  
**Maintenance:** Minimal (no external dependencies in source code)
