/**
 * Steps específicos da funcionalidade de autenticação via API (POST /login).
 */
import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import { API_BASE_URL, apiState } from './apiState';

Given('que envio uma requisição POST para {string} com credenciais de usuário recém-cadastrado via API', (endpoint) => {
  const timestamp = Date.now();
  apiState.dynamicUser = {
    nome: `Usuario API ${timestamp}`,
    email: `api_user_${timestamp}@qa.com`,
    password: 'password123',
    administrador: 'true'
  };

  cy.request({
    method: 'POST',
    url: `${API_BASE_URL}/usuarios`,
    body: apiState.dynamicUser,
    failOnStatusCode: false
  }).then(() => {
    cy.request({
      method: 'POST',
      url: `${API_BASE_URL}${endpoint}`,
      body: {
        email: apiState.dynamicUser.email,
        password: apiState.dynamicUser.password
      },
      failOnStatusCode: false
    }).then((res) => {
      apiState.response = res;
    });
  });
});

Then('deve ser retornado um token de autorização válido', () => {
  expect(apiState.response.body.authorization).to.be.a('string');
  expect(apiState.response.body.authorization).to.include('Bearer ');
  apiState.adminToken = apiState.response.body.authorization;
});
