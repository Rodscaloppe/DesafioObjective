/**
 * Módulo de passos (Step Definitions) para a Manutenção (exclusão) de Produtos.
 * Interage 100% via DOM e Navegador com a listagem de produtos.
 */
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { productListAdminPage } from '../../pages';

/**
 * Step: Dado que existe um produto previamente cadastrado chamado {string}
 * Garante o cadastro prévio via DOM caso o produto não esteja listado na tabela.
 */
let currentDeletedProd = '';

Given('que existe um produto previamente cadastrado chamado {string}', (productName) => {
  currentDeletedProd = `${productName} ${Date.now().toString().slice(-4)}`;
  cy.contains('a', 'Cadastrar Produtos').click();
  cy.get('[data-testid="nome"]').clear().type(currentDeletedProd);
  cy.get('[data-testid="preco"]').clear().type('1200');
  cy.get('[data-testid="descricao"]').clear().type('Cadeira gamer ergonômica');
  cy.get('[data-testid="quantity"]').clear().type('5');
  cy.get('[data-testid="cadastarProdutos"]').click();
});

When('localizo a linha correspondente ao produto {string}', (productName) => {
  productListAdminPage.locateProductRow(currentDeletedProd);
});

When('clico no botão {string} desta linha específica', (buttonText) => {
  if (buttonText === 'Excluir') {
    productListAdminPage.clickDeleteProduct(currentDeletedProd);
  }
});

Then('a linha contendo {string} deve desaparecer da tabela imediatamente', (productName) => {
  productListAdminPage.verifyProductNotDisplayed(currentDeletedProd);
});

Then('ao recarregar a página, o produto não deve voltar a ser exibido', () => {
  productListAdminPage.reloadPage();
  productListAdminPage.verifyProductNotDisplayed(currentDeletedProd);
});
