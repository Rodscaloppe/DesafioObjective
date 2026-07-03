/**
 * Steps específicos para gestão de produtos na API (POST e GET /produtos).
 */
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { API_BASE_URL, apiState } from './apiState';

Given('que obtenho um token de Administrador autenticado pela API', () => {
  const timestamp = Date.now();
  const adminUser = {
    nome: `Admin API ${timestamp}`,
    email: `admin_api_${timestamp}@qa.com`,
    password: 'adminpassword',
    administrador: 'true'
  };

  cy.request({
    method: 'POST',
    url: `${API_BASE_URL}/usuarios`,
    body: adminUser,
    failOnStatusCode: false
  }).then(() => {
    cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/login`,
      body: {
        email: adminUser.email,
        password: adminUser.password
      }
    }).then((res) => {
      apiState.adminToken = res.body.authorization;
    });
  });
});

When('envio uma requisição POST para {string} na API com os dados de um novo produto exclusivo', (endpoint) => {
  const timestamp = Date.now();
  apiState.createdProductData = {
    nome: `Produto API Exclusivo ${timestamp}`,
    preco: 850,
    descricao: 'Teclado Mecânico API',
    quantidade: 25
  };

  cy.request({
    method: 'POST',
    url: `${API_BASE_URL}${endpoint}`,
    headers: {
      Authorization: apiState.adminToken
    },
    body: apiState.createdProductData,
    failOnStatusCode: false
  }).then((res) => {
    apiState.response = res;
    if (res.body._id) {
      apiState.createdProductId = res.body._id;
    }
  });
});

Then('a propriedade {string} do novo produto deve ser retornada', (propName) => {
  expect(apiState.response.body).to.have.property(propName);
  expect(apiState.response.body[propName]).to.be.a('string').and.not.be.empty;
  apiState.createdProductId = apiState.response.body[propName];
});

Given('que existe um produto cadastrado via API para consulta de ID', () => {
  expect(apiState.createdProductId).to.be.a('string').and.not.be.empty;
});

When('envio uma requisição GET para o endpoint do produto recém-criado', () => {
  cy.request({
    method: 'GET',
    url: `${API_BASE_URL}/produtos/${apiState.createdProductId}`,
    failOnStatusCode: false
  }).then((res) => {
    apiState.response = res;
  });
});

Then('o corpo da resposta deve corresponder exatamente aos dados do produto cadastrado', () => {
  expect(apiState.response.body.nome).to.eq(apiState.createdProductData.nome);
  expect(apiState.response.body.preco).to.eq(apiState.createdProductData.preco);
  expect(apiState.response.body.descricao).to.eq(apiState.createdProductData.descricao);
  expect(apiState.response.body.quantidade).to.eq(apiState.createdProductData.quantidade);
  expect(apiState.response.body._id).to.eq(apiState.createdProductId);
});
