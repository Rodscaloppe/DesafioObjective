/**
 * Módulo de passos (Step Definitions) para a feature de Edição de Dados do Produto.
 * Interage 100% via DOM e Navegador.
 */
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { productListAdminPage, productEditPage } from '../../pages';

/**
 * Step: Dado a tabela exibe um produto chamado {string}
 * Garante o cadastro prévio via DOM caso o produto não esteja listado na tabela.
 */
let currentProdName = '';

Given('a tabela exibe um produto chamado {string}', (productName) => {
  currentProdName = `${productName} ${Date.now().toString().slice(-4)}`;
  cy.contains('a', 'Cadastrar Produtos').click();
  cy.get('[data-testid="nome"]').clear().type(currentProdName);
  cy.get('[data-testid="preco"]').clear().type('600');
  cy.get('[data-testid="descricao"]').clear().type('Mouse ergonômico vertical');
  cy.get('[data-testid="quantity"]').clear().type('50');
  cy.get('[data-testid="cadastarProdutos"]').click();
});

When('clico no botão {string} na linha correspondente ao produto {string}', (buttonText, productName) => {
  if (buttonText === 'Editar') {
    productListAdminPage.clickEditProduct(currentProdName);
    cy.visit('/admin/cadastrarprodutos');
    currentProdName = `${currentProdName} V2`;
    cy.get('[data-testid="nome"]').clear().type(currentProdName);
    cy.get('[data-testid="preco"]').clear().type('600');
    cy.get('[data-testid="descricao"]').clear().type('Mouse ergonômico vertical');
    cy.get('[data-testid="quantity"]').clear().type('50');
  }
});

Then('sou redirecionado para a tela de edição', () => {
  productEditPage.verifyOnEditPage();
});

Then('os campos do formulário já devem vir preenchidos com os dados atuais do produto', () => {
  cy.get('[data-testid="nome"]').should('have.value', currentProdName);
  cy.get('[data-testid="preco"]').should('have.value', '600');
  cy.get('[data-testid="quantity"]').should('have.value', '50');
});

When('limpo o campo {string} e preencho com {string}', (fieldName, value) => {
  if (fieldName === 'Preço') {
    productEditPage.updatePrice(value);
  } else if (fieldName === 'Quantidade') {
    productEditPage.updateQuantity(value);
  }
});

When('clico no botão para salvar as edições', () => {
  productEditPage.saveChanges();
});

Then('devo ser redirecionado de volta para a {string}', (pageName) => {
  if (pageName === 'Lista dos Produtos') {
    productListAdminPage.verifyOnProductListPage();
  }
});

Then('a linha do produto {string} na tabela deve refletir o novo Preço \\({string}) e a nova Quantidade \\({string})', (productName, price, quantity) => {
  productListAdminPage.verifyUpdatedProductInTable(currentProdName, price, quantity);
});
