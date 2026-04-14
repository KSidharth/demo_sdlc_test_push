
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Multiplication Utility - Unit Tests', () => {
  let dom: JSDOM;
  let document: Document;
  let window: Window;
  let container: HTMLElement;

  beforeEach(() => {
    // Load the actual HTML file
    const html = fs.readFileSync(
      path.resolve(__dirname, '../../../frontend/index.html'),
      'utf-8'
    );

    // Create a JSDOM instance
    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: 'http://localhost',
    });

    document = dom.window.document;
    window = dom.window as unknown as Window;
    container = document.body;

    // Load and execute the script
    const scriptContent = fs.readFileSync(
      path.resolve(__dirname, '../../../frontend/script.js'),
      'utf-8'
    );

    const scriptElement = document.createElement('script');
    scriptElement.textContent = scriptContent;
    document.body.appendChild(scriptElement);

    // Trigger DOMContentLoaded if script is waiting
    if (document.readyState === 'loading') {
      const event = new dom.window.Event('DOMContentLoaded');
      document.dispatchEvent(event);
    }
  });

  afterEach(() => {
    dom.window.close();
  });

  describe('DOM Element Initialization', () => {
    it('should render two numeric input fields on page load', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;

      expect(numberA).toBeTruthy();
      expect(numberB).toBeTruthy();
      expect(numberA.type).toBe('number');
      expect(numberB.type).toBe('number');
    });

    it('should render a submit button labeled "Submit"', () => {
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

      expect(submitBtn).toBeTruthy();
      expect(submitBtn.textContent?.trim()).toBe('Submit');
      expect(submitBtn.type).toBe('button');
    });

    it('should have result field hidden on initial page load', () => {
      const resultField = document.getElementById('resultField') as HTMLElement;

      expect(resultField).toBeTruthy();
      expect(resultField.style.display).toBe('none');
    });

    it('should have error message field hidden on initial page load', () => {
      const errorMessage = document.getElementById('errorMessage') as HTMLElement;

      expect(errorMessage).toBeTruthy();
      expect(errorMessage.style.display).toBe('none');
    });

    it('should have all required ARIA labels for accessibility', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

      expect(numberA.getAttribute('aria-label')).toBe('First number input');
      expect(numberB.getAttribute('aria-label')).toBe('Second number input');
      expect(submitBtn.getAttribute('aria-label')).toBe('Calculate product');
    });
  });

  describe('Input Validation', () => {
    it('should show error when both fields are empty', () => {
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const errorMessage = document.getElementById('errorMessage') as HTMLElement;

      submitBtn.click();

      expect(errorMessage.style.display).toBe('block');
      expect(errorMessage.textContent).toBe('Please enter values in both fields.');
    });

    it('should show error when first field is empty', () => {
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const errorMessage = document.getElementById('errorMessage') as HTMLElement;

      numberB.value = '5';
      submitBtn.click();

      expect(errorMessage.style.display).toBe('block');
      expect(errorMessage.textContent).toBe('Please enter a value in the first field.');
    });

    it('should show error when second field is empty', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const errorMessage = document.getElementById('errorMessage') as HTMLElement;

      numberA.value = '5';
      submitBtn.click();

      expect(errorMessage.style.display).toBe('block');
      expect(errorMessage.textContent).toBe('Please enter a value in the second field.');
    });

    it('should show error when fields contain non-numeric values', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const errorMessage = document.getElementById('errorMessage') as HTMLElement;

      // Force invalid values (bypassing HTML5 validation for testing)
      numberA.value = 'abc';
      numberB.value = 'xyz';
      submitBtn.click();

      expect(errorMessage.style.display).toBe('block');
      expect(errorMessage.textContent).toBe('Please enter valid numeric values.');
    });

    it('should clear error message when user starts typing in first field', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const errorMessage = document.getElementById('errorMessage') as HTMLElement;

      // Trigger error
      submitBtn.click();
      expect(errorMessage.style.display).toBe('block');

      // Simulate typing
      const inputEvent = new dom.window.Event('input');
      numberA.dispatchEvent(inputEvent);

      expect(errorMessage.style.display).toBe('none');
    });

    it('should clear error message when user starts typing in second field', () => {
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const errorMessage = document.getElementById('errorMessage') as HTMLElement;

      // Trigger error
      submitBtn.click();
      expect(errorMessage.style.display).toBe('block');

      // Simulate typing
      const inputEvent = new dom.window.Event('input');
      numberB.dispatchEvent(inputEvent);

      expect(errorMessage.style.display).toBe('none');
    });
  });

  describe('Multiplication Logic', () => {
    it('should calculate product of two positive integers correctly', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const resultValue = document.getElementById('resultValue') as HTMLElement;

      numberA.value = '5';
      numberB.value = '7';
      submitBtn.click();

      expect(resultValue.textContent).toBe('35');
    });

    it('should calculate product of two decimal numbers correctly', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const resultValue = document.getElementById('resultValue') as HTMLElement;

      numberA.value = '2.5';
      numberB.value = '4';
      submitBtn.click();

      expect(resultValue.textContent).toBe('10');
    });

    it('should calculate product with negative numbers correctly', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const resultValue = document.getElementById('resultValue') as HTMLElement;

      numberA.value = '-3';
      numberB.value = '6';
      submitBtn.click();

      expect(resultValue.textContent).toBe('-18');
    });

    it('should calculate product of two negative numbers correctly', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const resultValue = document.getElementById('resultValue') as HTMLElement;

      numberA.value = '-4';
      numberB.value = '-5';
      submitBtn.click();

      expect(resultValue.textContent).toBe('20');
    });

    it('should handle multiplication by zero correctly', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const resultValue = document.getElementById('resultValue') as HTMLElement;

      numberA.value = '100';
      numberB.value = '0';
      submitBtn.click();

      expect(resultValue.textContent).toBe('0');
    });

    it('should handle very large numbers correctly', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const resultValue = document.getElementById('resultValue') as HTMLElement;

      numberA.value = '1000000000000000';
      numberB.value = '2';
      submitBtn.click();

      expect(resultValue.textContent).toContain('e+');
    });

    it('should handle very small decimal numbers correctly', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const resultValue = document.getElementById('resultValue') as HTMLElement;

      numberA.value = '0.0000001';
      numberB.value = '2';
      submitBtn.click();

      expect(resultValue.textContent).toContain('e-');
    });
  });

  describe('Result Display Behavior', () => {
    it('should show result field after successful calculation', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const resultField = document.getElementById('resultField') as HTMLElement;

      numberA.value = '3';
      numberB.value = '4';
      submitBtn.click();

      expect(resultField.style.display).toBe('block');
    });

    it('should update result when inputs change and Submit is clicked again', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const resultValue = document.getElementById('resultValue') as HTMLElement;

      // First calculation
      numberA.value = '3';
      numberB.value = '4';
      submitBtn.click();
      expect(resultValue.textContent).toBe('12');

      // Second calculation with updated values
      numberA.value = '5';
      numberB.value = '6';
      submitBtn.click();
      expect(resultValue.textContent).toBe('30');
    });

    it('should hide result field when error is displayed', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const resultField = document.getElementById('resultField') as HTMLElement;

      // First successful calculation
      numberA.value = '3';
      numberB.value = '4';
      submitBtn.click();
      expect(resultField.style.display).toBe('block');

      // Trigger error by clearing fields
      numberA.value = '';
      numberB.value = '';
      submitBtn.click();

      expect(resultField.style.display).toBe('none');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should trigger calculation when Enter is pressed in first input field', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const resultValue = document.getElementById('resultValue') as HTMLElement;

      numberA.value = '8';
      numberB.value = '9';

      const enterEvent = new dom.window.KeyboardEvent('keypress', {
        key: 'Enter',
        bubbles: true,
        cancelable: true,
      });
      numberA.dispatchEvent(enterEvent);

      expect(resultValue.textContent).toBe('72');
    });

    it('should trigger calculation when Enter is pressed in second input field', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const resultValue = document.getElementById('resultValue') as HTMLElement;

      numberA.value = '6';
      numberB.value = '7';

      const enterEvent = new dom.window.KeyboardEvent('keypress', {
        key: 'Enter',
        bubbles: true,
        cancelable: true,
      });
      numberB.dispatchEvent(enterEvent);

      expect(resultValue.textContent).toBe('42');
    });
  });

  describe('Edge Cases', () => {
    it('should handle whitespace in input values', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const resultValue = document.getElementById('resultValue') as HTMLElement;

      numberA.value = '  10  ';
      numberB.value = '  5  ';
      submitBtn.click();

      expect(resultValue.textContent).toBe('50');
    });

    it('should handle leading zeros in input values', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const resultValue = document.getElementById('resultValue') as HTMLElement;

      numberA.value = '007';
      numberB.value = '003';
      submitBtn.click();

      expect(resultValue.textContent).toBe('21');
    });

    it('should handle scientific notation input', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
      const resultValue = document.getElementById('resultValue') as HTMLElement;

      numberA.value = '1e3';
      numberB.value = '2';
      submitBtn.click();

      expect(resultValue.textContent).toBe('2000');
    });
  });

  describe('Accessibility Features', () => {
    it('should create ARIA live region for screen reader announcements', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

      numberA.value = '5';
      numberB.value = '5';
      submitBtn.click();

      const liveRegion = document.getElementById('aria-live-region');
      expect(liveRegion).toBeTruthy();
      expect(liveRegion?.getAttribute('aria-live')).toBe('polite');
      expect(liveRegion?.getAttribute('aria-atomic')).toBe('true');
    });

    it('should announce result to screen readers after calculation', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

      numberA.value = '3';
      numberB.value = '4';
      submitBtn.click();

      const liveRegion = document.getElementById('aria-live-region');
      expect(liveRegion?.textContent).toContain('Result calculated: 12');
    });

    it('should announce errors to screen readers', () => {
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

      submitBtn.click();

      const liveRegion = document.getElementById('aria-live-region');
      expect(liveRegion?.textContent).toContain('Error:');
    });
  });

  describe('Performance Requirements', () => {
    it('should calculate and render result in under 100ms', () => {
      const numberA = document.getElementById('numberA') as HTMLInputElement;
      const numberB = document.getElementById('numberB') as HTMLInputElement;
      const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

      numberA.value = '123456';
      numberB.value = '789012';

      const startTime = performance.now();
      submitBtn.click();
      const endTime = performance.now();

      const executionTime = endTime - startTime;
      expect(executionTime).toBeLessThan(100);
    });
  });
});
