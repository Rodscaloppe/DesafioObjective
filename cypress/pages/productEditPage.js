class ProductEditPage {
  verifyOnEditPage() {
    // Verifica se os campos de edição estão presentes e visíveis
    cy.get('[data-testid="preco"]').should('be.visible');
    cy.get('[data-testid="quantity"]').should('be.visible');
    return this;
  }

  verifyPrefilledData(name) {
    cy.get('[data-testid="nome"]').should('have.value', name);
    return this;
  }

  updatePrice(newPrice) {
    cy.get('[data-testid="preco"]').clear().type(newPrice);
    return this;
  }

  updateQuantity(newQuantity) {
    cy.get('[data-testid="quantity"]').clear().type(newQuantity);
    return this;
  }

  saveChanges() {
    cy.get('[data-testid="cadastarProdutos"]').click();
    cy.get('body').then(($body) => {
      if ($body.text().includes('Já existe')) {
        cy.contains('a', 'Listar Produtos').click();
      }
    });
    return this;
  }
}

export const productEditPage = new ProductEditPage();
