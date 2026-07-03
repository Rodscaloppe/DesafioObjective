class LoginPage {
  accessPage() {
    cy.visit('/login');
    return this;
  }

  fillEmail(email) {
    cy.get('[data-testid="email"]').clear().type(email);
    return this;
  }

  fillPassword(password) {
    cy.get('[data-testid="senha"]').clear().type(password);
    return this;
  }

  clickLogin() {
    cy.get('[data-testid="entrar"]').click();
    return this;
  }

  verifyOnLoginPage() {
    cy.url().should('include', '/login');
    return this;
  }

  verifyErrorMessage(message) {
    cy.contains(message).should('be.visible');
    return this;
  }

  loginAs(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickLogin();
    return this;
  }
}

export const loginPage = new LoginPage();
