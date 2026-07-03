/**
 * Módulo de passos (Step Definitions) para validação de exceções e mensagens de erro do sistema.
 * Cobre tentativas de acesso incorretas (login inválido) e envio de formulários em branco (validação de obrigatoriedade).
 */
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { loginPage, registerPage } from '../../../pages';

/**
 * Step: Quando preencho o campo {string} na tela de login com {string}
 * Insere credenciais (e-mail ou senha) especificamente no formulário de login.
 */
When('preencho o campo {string} na tela de login com {string}', (fieldName, value) => {
  if (fieldName === 'Email') {
    loginPage.fillEmail(value);
  } else if (fieldName === 'Senha') {
    loginPage.fillPassword(value);
  }
});

/**
 * Step: Quando clico no botão {string} sem preencher nenhum campo
 * Dispara a tentativa de submissão em branco para validar as mensagens de erro do frontend.
 */
When('clico no botão {string} sem preencher nenhum campo', (buttonText) => {
  if (buttonText === 'Cadastrar') {
    registerPage.clickRegister();
  }
});

Then('devo permanecer na página de {string}', (pageName) => {
  if (pageName === 'Login') {
    loginPage.verifyOnLoginPage();
  } else if (pageName === 'Cadastro') {
    registerPage.verifyOnRegisterPage();
  }
});

Then('devo visualizar a mensagem de erro {string}', (errorMessage) => {
  cy.contains(errorMessage).should('be.visible');
});
