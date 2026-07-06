/**
 * Módulo de passos (Step Definitions) para a feature de Edição de Dados do Produto.
 * Interage 100% via DOM e Navegador.
 */
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { homePage, productCreatePage, productListAdminPage, productEditPage } from '../../../pages';

/**
 * Step: Dado a tabela exibe um produto chamado {string}
 * Garante o cadastro prévio via DOM caso o produto não esteja listado na tabela.
 */
let currentProdName = '';

Given('a tabela exibe um produto chamado {string}', (productName) => {
  currentProdName = `${productName} ${Date.now().toString().slice(-4)}`;
  homePage.navigateToRegisterProducts();
  productCreatePage
    .fillName(currentProdName)
    .fillPrice('600')
    .fillDescription('Mouse ergonômico vertical')
    .fillQuantity('50')
    .submitForm();
});

When('clico no botão {string} na linha correspondente ao produto {string}', (buttonText, productName) => {
  if (buttonText === 'Editar') {
    productListAdminPage.clickEditProduct(currentProdName);
    currentProdName = `${currentProdName} V2`;
  }
});

Then('sou redirecionado para a tela de edição', () => {
  productEditPage.verifyOnEditPage();
});

Then('os campos do formulário já devem vir preenchidos com os dados atuais do produto', () => {
  productEditPage.verifyPrefilledData(currentProdName, '600', '50');
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
