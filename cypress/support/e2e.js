import './commands';
import 'cypress-mochawesome-reporter/register';

// Prevents Cypress from failing tests on application errors or React warnings
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
