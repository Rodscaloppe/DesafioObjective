/**
 * Módulo de passos (Step Definitions) para a Manutenção (exclusão) de Produtos.
 * Interage 100% via DOM e Navegador com a listagem de produtos.
 */
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { homePage, productCreatePage, productListAdminPage } from '../../../pages';

/**
 * Step: Dado que existe um produto previamente cadastrado chamado {string}
 * Garante o cadastro prévio via POM caso o produto não esteja listado na tabela.
 */
let currentDeletedProd = '';

Given('que existe um produto previamente cadastrado chamado {string}', (productName) => {
  currentDeletedProd = `${productName} ${Date.now().toString().slice(-4)}`;
  homePage.navigateToRegisterProducts();
  productCreatePage
    .fillName(currentDeletedProd)
    .fillPrice('1200')
    .fillDescription('Cadeira gamer ergonômica')
    .fillQuantity('5')
    .submitForm();
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
