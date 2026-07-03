/**
 * Estado centralizado compartilhado entre os step definitions da API.
 */
export const API_BASE_URL = Cypress.env('API_BASE_URL') || 'https://serverest.dev';

export const apiState = {
  response: null,
  adminToken: '',
  dynamicUser: {},
  createdProductId: '',
  createdProductData: {}
};
