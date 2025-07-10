const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {},
    viewportWidth: 360,
    viewportHeight: 800,
    //retries: 1
  },
});