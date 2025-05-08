const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

When('I enter text {kraken-string} into the input with id {string}', async function(text, id) {
    const el = await this.driver.$(`#${id}`);
    return el.setValue(text);
  });
  
  When('I click on the element with data-test-button {string}', async function(btnName) {
    const el = await this.driver.$(`[data-test-button="${btnName}"]`);
    return el.click();
  });
  
  Then('I wait for url containing {string} for {int} seconds', async function(pattern, secs) {
    await this.driver.waitUntil(
      async () => (await this.driver.getUrl()).includes(pattern),
      {
        timeout: secs * 1000,
        timeoutMsg: `La URL no contenía "${pattern}" tras ${secs}s`
      }
    );
  });
  
  Then('I should see the Ghost dashboard', async function() {
    const header = await this.driver.$('.gh-notifications');
    return header.isDisplayed();
  });

  Then('I should see text {string} in the element with selector {string}', async function(expectedText, selector) {
    const elems = await this.driver.$$(selector);
  
    for (const el of elems) {
      if (await el.isDisplayed()) {
        const actual = (await el.getText()).trim();
        assert.strictEqual(actual, expectedText);
        return;
      }
    }
  
    throw new Error(`No se encontró ningún elemento visible con selector "${selector}"`);
  });
