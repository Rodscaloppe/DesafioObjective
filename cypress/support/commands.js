// Custom commands para o projeto Cypress + BDD

/**
 * Comando customizado para autenticação via API (Bypass da UI).
 * Reduz tempo de execução em até 80% e elimina intermitências de UI e redirecionamento no CI.
 * @param {Object} [customUser] - Dados opcionais para sobrescrever o usuário padrão.
 */
Cypress.Commands.add('loginViaAPI', (customUser = {}) => {
  const timestamp = Date.now();
  const user = {
    nome: customUser.nome || `Admin E2E ${timestamp}`,
    email: customUser.email || `admin_e2e_${timestamp}@qa.com`,
    password: customUser.password || 'admin123',
    administrador: customUser.administrador !== undefined ? String(customUser.administrador) : 'true'
  };

  const apiBaseUrl = Cypress.env('API_BASE_URL') || 'https://serverest.dev';

  // 1. Cadastrar usuário via API HTTP
  cy.request({
    method: 'POST',
    url: `${apiBaseUrl}/usuarios`,
    body: user,
    failOnStatusCode: false
  }).then(() => {
    // 2. Realizar login via API HTTP para obter o token JWT
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/login`,
      body: {
        email: user.email,
        password: user.password
      }
    }).then((response) => {
      const token = response.body.authorization;

      // 3. Redirecionar para a página alvo injetando o token e email no localStorage via onBeforeLoad
      const targetUrl = user.administrador === 'true' ? '/admin/home' : '/home';
      cy.visit(targetUrl, {
        onBeforeLoad(win) {
          win.localStorage.setItem('serverest/userEmail', user.email);
          win.localStorage.setItem('serverest/userToken', token);
        }
      });
    });
  });
});
