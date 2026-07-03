import './commands';

// Prevents Cypress from failing tests on application errors or React warnings
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
