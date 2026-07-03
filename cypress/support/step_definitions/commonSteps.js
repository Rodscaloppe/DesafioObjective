/**
 * Módulo de passos (Step Definitions) comuns e compartilhados entre diversas features BDD.
 * Centraliza ações frequentes como login de administrador e navegação pelo menu principal.
 */
import { Given } from '@badeball/cypress-cucumber-preprocessor';
import { loginPage, homePage } from '../../pages';

/**
 * Step: Dado que realizo login no sistema com credenciais de Administrador
 * Realiza a autenticação prévia com usuário administrador padrão para acessar áreas restritas do sistema.
 */
Given('que realizo login no sistema com credenciais de Administrador', () => {
  const adminEmail = `admin_e2e_${Date.now()}@qa.com`;
  cy.visit('/cadastrarusuarios');
  cy.get('[data-testid="nome"]').type('Admin E2E');
  cy.get('[data-testid="email"]').type(adminEmail);
  cy.get('[data-testid="password"]').type('admin123');
  cy.get('[data-testid="checkbox"]').check();
  cy.get('[data-testid="cadastrar"]').click();
  homePage.verifyOnHomePage();
});

/**
 * Step: Dado navego pelo menu até {string}
 * Gerencia o roteamento entre as telas de administração do e-commerce através do menu da Home.
 * @param {string} menuOption - Opção do menu a ser clicada (ex: "Cadastrar Produtos", "Listar Produtos")
 */
Given('navego pelo menu até {string}', (menuOption) => {
  if (menuOption === 'Cadastrar Produtos') {
    homePage.navigateToRegisterProducts();
  } else if (menuOption === 'Listar Produtos') {
    homePage.navigateToListProducts();
  }
});
