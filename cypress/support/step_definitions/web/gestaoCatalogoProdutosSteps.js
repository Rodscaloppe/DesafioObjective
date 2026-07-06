/**
 * Módulo de passos (Step Definitions) para a gestão de catálogo de produtos.
 * Responsável pelo preenchimento de dados de produto, anexo/upload de imagem, submissão do formulário
 * e validação da listagem recém-cadastrada.
 */
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { productCreatePage, productListAdminPage } from '../../../pages';

/**
 * Step: Quando preencho o campo {string} com {string}
 * Preenche campos individuais de texto na tela de criação de produtos.
 */
let currentCreatedProduct = '';

When('preencho o campo {string} com {string}', (fieldName, value) => {
  if (fieldName === 'Nome') {
    currentCreatedProduct = `${value} ${Date.now().toString().slice(-4)}`;
    productCreatePage.fillName(currentCreatedProduct);
  }
});

/**
 * Step: Quando preencho {string} com {string}
 * Preenche campos numéricos ou descritivos do produto.
 */
When('preencho {string} com {string}', (fieldName, value) => {
  if (fieldName === 'Preço') {
    productCreatePage.fillPrice(value);
  } else if (fieldName === 'Descrição') {
    productCreatePage.fillDescription(value);
  } else if (fieldName === 'Quantidade') {
    productCreatePage.fillQuantity(value);
  }
});

/**
 * Step: Quando realizo o upload do arquivo {string} no campo {string}
 * Realiza o upload de imagens a partir da pasta fixtures para ilustrar o produto.
 */
When('realizo o upload do arquivo {string} no campo {string}', (fileName, fieldName) => {
  productCreatePage.uploadImage(fileName);
});

/**
 * Step: Quando submeto o formulário clicando em {string}
 * Envia os dados do novo produto via DOM.
 */
When('submeto o formulário clicando em {string}', (buttonName) => {
  if (buttonName === 'Cadastrar') {
    productCreatePage.submitForm();
  }
});

Then('sou redirecionado para a página {string}', (pageName) => {
  if (pageName === 'Lista dos Produtos') {
    productListAdminPage.verifyOnProductListPage();
  }
});

Then('o produto {string} deve ser exibido na tabela', (productName) => {
  productListAdminPage.verifyProductInTable(currentCreatedProduct);
});

Then('o preço exibido na tabela deve ser {string}', (price) => {
  productListAdminPage.verifyProductPriceInTable(currentCreatedProduct, price);
});

Then('a quantidade exibida na tabela deve ser {string}', (quantity) => {
  productListAdminPage.verifyProductQuantityInTable(currentCreatedProduct, quantity);
});
