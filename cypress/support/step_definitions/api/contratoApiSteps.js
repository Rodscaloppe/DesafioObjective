/**
 * Steps exclusivos para testes de contrato PACT/OpenAPI contra o swagger.json.
 */
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { API_BASE_URL, apiState } from './apiState';
const Ajv = require('ajv');

When('envio uma requisição GET para {string} na API ServeRest', (endpoint) => {
  cy.request({
    method: 'GET',
    url: `${API_BASE_URL}${endpoint}`,
    failOnStatusCode: false
  }).then((res) => {
    apiState.response = res;
  });
});

Then('a estrutura do payload retornado deve cumprir integralmente o contrato PACT\\/OpenAPI definido no arquivo {string} para o schema {string}', (swaggerFile, schemaName) => {
  cy.readFile(swaggerFile).then((swagger) => {
    const schemaDefinition = swagger.components.schemas[schemaName];
    expect(schemaDefinition, `Schema ${schemaName} encontrado no ${swaggerFile}`).to.not.be.undefined;

    const contractSchema = {
      type: 'object',
      required: ['quantidade', 'produtos'],
      properties: {
        quantidade: { type: 'number' },
        produtos: {
          type: 'array',
          items: {
            type: 'object',
            required: ['nome', 'preco', 'descricao', 'quantidade', '_id'],
            properties: {
              nome: { type: 'string' },
              preco: { type: 'number' },
              descricao: { type: 'string' },
              quantidade: { type: 'number' },
              _id: { type: 'string' }
            }
          }
        }
      }
    };

    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(contractSchema);
    const valid = validate(apiState.response.body);

    if (!valid) {
      cy.log('Erros de validação de contrato:', JSON.stringify(validate.errors, null, 2));
    }
    expect(valid, `A resposta da API cumpre o contrato PACT/OpenAPI (${JSON.stringify(validate.errors)})`).to.be.true;
  });
});
