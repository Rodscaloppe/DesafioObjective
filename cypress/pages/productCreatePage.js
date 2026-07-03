class ProductCreatePage {
  fillName(name) {
    cy.get('[data-testid="nome"]').clear().type(name);
    return this;
  }

  fillPrice(price) {
    cy.get('[data-testid="preco"]').clear().type(price);
    return this;
  }

  fillDescription(description) {
    cy.get('[data-testid="descricao"]').clear().type(description);
    return this;
  }

  fillQuantity(quantity) {
    cy.get('[data-testid="quantity"]').clear().type(quantity);
    return this;
  }

  uploadImage(fileName) {
    cy.get('[data-testid="imagem"]').selectFile(`cypress/fixtures/${fileName}`, { force: true });
    return this;
  }

  submitForm() {
    cy.get('[data-testid="cadastarProdutos"]').click();
    return this;
  }
}

export const productCreatePage = new ProductCreatePage();
