class HomePage {
  verifyOnHomePage() {
    cy.url().should('include', '/home');
    return this;
  }

  clickLogout() {
    cy.get('[data-testid="logout"]').click();
    return this;
  }

  navigateToRegisterProducts() {
    cy.get('[data-testid="cadastrar-produtos"]').click();
    return this;
  }

  navigateToListProducts() {
    cy.get('[data-testid="listar-produtos"]').click();
    return this;
  }

  verifyActiveSession() {
    cy.get('[data-testid="logout"]').should('be.visible');
    return this;
  }
}

export const homePage = new HomePage();
