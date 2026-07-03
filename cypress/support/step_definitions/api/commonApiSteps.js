/**
 * Steps comuns e compartilhados nas verificações da API ServeRest.
 */
import { Then } from '@badeball/cypress-cucumber-preprocessor';
import { apiState } from './apiState';

Then('a resposta da API deve retornar status {int}', (expectedStatus) => {
  expect(apiState.response.status).to.eq(expectedStatus);
});

Then('o corpo da resposta deve conter a mensagem {string}', (expectedMessage) => {
  expect(apiState.response.body.message).to.eq(expectedMessage);
});
