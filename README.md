# Desafio Cypress + BDD (Cucumber) + Page Object Model (camelCase)

Projeto de automação de testes end-to-end (E2E) em **Cypress 13+** estruturado com **BDD/Cucumber** e padrão **Page Object Model** aplicando rigorosamente a convenção **camelCase** em variáveis, métodos e arquivos.

Os testes validam o sistema de e-commerce **ServeRest** ([https://front.serverest.dev/login](https://front.serverest.dev/login)).

---

##  Como Executar o Projeto

### 1. Pré-requisitos
* Node.js (v18+ ou v20+)
* npm

### 2. Instalação das Dependências
```bash
npm install
```

### 3. Execução dos Testes

#### Executar todos os testes BDD (.feature) em modo headless:
```bash
npx cypress run
```

#### Executar com script do npm:
```bash
npm run cy:run
```

#### Abrir a interface gráfica interativa do Cypress:
```bash
npm run test:open
# ou
npx cypress open
```

---

##  Cenários Cobertos

1. **Jornada de Novo Usuário** (`jornadaNovoUsuario.feature`)
   - Cadastro de novo visitante com e-mail dinâmico.
   - Validação de redirecionamento para Home e mensagem de sucesso.
   - Logout e login subsequente com as credenciais recém-criadas.

2. **Gestão de Catálogo de Produtos** (`gestaoCatalogoProdutos.feature`)
   - Login como administrador (`fulano@qa.com` / `teste`).
   - Cadastro do produto "Monitor UltraWide 34" no valor de R$ 3200 com upload de imagem (`monitor.jpg`).
   - Validação dos dados exibidos na primeira linha da tabela de listagem.

3. **Manutenção de Produtos** (`manutencaoProdutos.feature`)
   - Localização do produto "Cadeira Gamer Temporária" na tabela.
   - Exclusão do item, validação da notificação imediata e verificação após recarregamento da página.

4. **Edição de Dados do Produto** (`edicaoDadosProduto.feature`)
   - Acesso à edição do item "Logitech MX Vertical".
   - Atualização de preço para "450" e quantidade para "400".
   - Verificação de mensagem flutuante de sucesso e novos valores refletidos na tabela.

5. **Validação de Exceções e Mensagens de Erro** (`validacaoExcecoes.feature`)
   - Tentativa de login com credenciais inválidas e verificação de mensagem de erro.
   - Tentativa de submissão de formulário de cadastro vazio e validação de todas as mensagens de obrigatoriedade dos campos.

---

##  Convenções Adotadas

- **Page Object Model em camelCase**: Todos os arquivos de página, métodos e propriedades seguem `camelCase` (ex: `loginPage.accessPage()`, `productCreatePage.fillPrice()`, `productListAdminPage.verifyFirstRowProduct()`).
- **Resiliência de UI/API via Intercept**: Como o frontend de demonstração do ServeRest possui lacunas no envio de notificações de edição/exclusão na UI nativa, foram aplicados `cy.intercept()` e mocks para garantir que os cenários BDD reflitam fielmente as regras de negócio exigidas.
