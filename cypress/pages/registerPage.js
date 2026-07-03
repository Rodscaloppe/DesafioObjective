class RegisterPage {
  accessPage() {
    cy.visit('/cadastrarusuarios');
    return this;
  }

  fillName(name) {
    cy.get('[data-testid="nome"]').clear().type(name);
    return this;
  }

  fillEmail(email) {
    cy.get('[data-testid="email"]').clear().type(email);
    return this;
  }

  fillPassword(password) {
    cy.get('[data-testid="password"]').clear().type(password);
    return this;
  }

  keepAdminUnchecked() {
    cy.get('[data-testid="checkbox"]').uncheck({ force: true });
    return this;
  }

  clickRegister() {
    cy.get('[data-testid="cadastrar"]').click();
    return this;
  }

  verifySuccessMessage(message) {
    cy.contains(message).should('be.visible');
    return this;
  }

  verifyOnRegisterPage() {
    cy.url().should('include', '/cadastrarusuarios');
    return this;
  }

  verifyErrorMessage(message) {
    cy.contains(message).should('be.visible');
    return this;
  }
}

export const registerPage = new RegisterPage();
