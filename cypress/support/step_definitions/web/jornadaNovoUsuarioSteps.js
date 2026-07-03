/**
 * Módulo de passos (Step Definitions) para a Jornada de Novo Usuário.
 * Gerencia a geração de massa de dados dinâmica (nome e e-mail com timestamp), cadastro de novo visitante,
 * verificação de sessão, logout e login subsequente com a nova conta criada.
 */
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { registerPage, loginPage, homePage } from '../../../pages';

// Armazenamento local temporário durante o fluxo do teste para reutilização no login
let dynamicEmail = '';
let dynamicName = '';
const validPassword = 'SenhaSegura123!';

/**
 * Step: Dado que acesso a página de {string}
 * Navega diretamente para a URL da página solicitada pelo cenário.
 */
Given('que acesso a página de {string}', (pageName) => {
  if (pageName === 'Cadastro') {
    registerPage.accessPage();
  } else if (pageName === 'Login') {
    loginPage.accessPage();
  }
});

When('preencho {string} com um nome dinâmico válido', (field) => {
  dynamicName = `Usuario Novo ${Date.now()}`;
  registerPage.fillName(dynamicName);
});

When('preencho {string} com um e-mail dinâmico não registrado', (field) => {
  dynamicEmail = `novo_visitante_${Date.now()}_${Math.floor(Math.random() * 1000)}@qa.com`;
  registerPage.fillEmail(dynamicEmail);
});

When('preencho {string} com uma senha válida', (field) => {
  registerPage.fillPassword(validPassword);
});

When('deixo a opção {string} desmarcada', (optionName) => {
  registerPage.keepAdminUnchecked();
});

When('clico no botão {string}', (buttonText) => {
  if (buttonText === 'Cadastrar') {
    registerPage.clickRegister();
  } else if (buttonText === 'Logout') {
    homePage.clickLogout();
  }
});

Then('devo ser redirecionado para a página {string}', (pageName) => {
  if (pageName === 'Home') {
    homePage.verifyOnHomePage();
  }
});

Then('devo ver a mensagem de {string}', (message) => {
  registerPage.verifySuccessMessage(message);
});

When('preencho a página de {string} com o e-mail e senha recém-criados', (pageName) => {
  loginPage.fillEmail(dynamicEmail).fillPassword(validPassword);
});

When('clico em {string}', (buttonText) => {
  if (buttonText === 'Entrar') {
    loginPage.clickLogin();
  }
});

Then('sou redirecionado para a página {string} novamente', (pageName) => {
  homePage.verifyOnHomePage();
});

Then('a sessão do usuário deve estar ativa', () => {
  homePage.verifyActiveSession();
});
