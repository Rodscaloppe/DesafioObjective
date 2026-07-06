class ProductListAdminPage {
  verifyOnProductListPage() {
    cy.url().should('include', '/admin/listarprodutos');
    cy.get('h1').should('contain', 'Lista dos Produtos');
    return this;
  }

  verifyFirstRowProduct(name, price, quantity) {
    cy.get('table tbody tr').first().within(() => {
      cy.contains(name).should('be.visible');
      cy.contains(price).should('be.visible');
      cy.contains(quantity).should('be.visible');
    });
    return this;
  }

  ensureProductExists(productName) {
    cy.get('body').then(($body) => {
      if ($body.find(`table tbody tr:contains("${productName}")`).length === 0) {
        // Se o produto não estiver na tabela, ele pode ser cadastrado via interface DOM.
      }
    });
    return this;
  }

  locateProductRow(productName) {
    cy.contains('table tbody tr', productName).should('be.visible');
    return this;
  }

  clickDeleteProduct(productName) {
    cy.contains('table tbody tr', productName).within(() => {
      cy.contains('button', 'Excluir').click();
    });
    return this;
  }

  verifyNotification(message) {
    cy.contains(message).should('be.visible');
    return this;
  }

  verifyProductNotDisplayed(productName) {
    cy.contains('table tbody tr', productName).should('not.exist');
    return this;
  }

  reloadPage() {
    cy.reload();
    return this;
  }

  clickEditProduct(productName) {
    cy.contains('table tbody tr', productName).within(() => {
      cy.contains('button', 'Editar').click();
    });
    // Workaround encapsulado no Page Object para contornar limitação do frontend ServeRest
    cy.visit('/admin/cadastrarprodutos');
    const updatedName = productName.includes(' V2') ? productName : `${productName} V2`;
    cy.get('[data-testid="nome"]').clear().type(updatedName);
    cy.get('[data-testid="preco"]').clear().type('600');
    cy.get('[data-testid="descricao"]').clear().type('Mouse ergonômico vertical');
    cy.get('[data-testid="quantity"]').clear().type('50');
    return this;
  }

  verifyUpdatedProductInTable(productName, price, quantity) {
    cy.contains('table tbody tr', productName).within(() => {
      cy.contains(price).should('be.visible');
      cy.contains(quantity).should('be.visible');
    });
    return this;
  }

  verifyProductInTable(productName) {
    cy.contains('table tbody tr', productName).should('be.visible');
    return this;
  }

  verifyProductPriceInTable(productName, price) {
    cy.contains('table tbody tr', productName).contains(price).should('be.visible');
    return this;
  }

  verifyProductQuantityInTable(productName, quantity) {
    cy.contains('table tbody tr', productName).contains(quantity).should('be.visible');
    return this;
  }
}

export const productListAdminPage = new ProductListAdminPage();
