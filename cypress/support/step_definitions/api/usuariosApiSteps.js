/**
 * Steps específicos para consulta de usuários via API (GET /usuarios).
 */
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { API_BASE_URL, apiState } from './apiState';

When('envio uma requisição GET para {string} na API', (endpoint) => {
  cy.request({
    method: 'GET',
    url: `${API_BASE_URL}${endpoint}`,
    failOnStatusCode: false
  }).then((res) => {
    apiState.response = res;
  });
});

Then('o corpo da resposta deve conter a propriedade {string} como número', (propertyName) => {
  expect(apiState.response.body).to.have.property(propertyName);
  expect(apiState.response.body[propertyName]).to.be.a('number');
});

Then('a lista {string} deve ser um array não vazio contendo campos como nome, email e administrador', (listName) => {
  expect(apiState.response.body[listName]).to.be.an('array').that.is.not.empty;
  const firstItem = apiState.response.body[listName][0];
  expect(firstItem).to.have.property('nome');
  expect(firstItem).to.have.property('email');
  expect(firstItem).to.have.property('administrador');
  expect(firstItem).to.have.property('_id');
});
