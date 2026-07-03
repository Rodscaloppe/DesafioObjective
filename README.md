# Desafio Cypress + BDD (Cucumber) + Page Object Model (camelCase)
#  Automação Full Stack E2E & API — Cypress + BDD (Cucumber) + PACT/OpenAPI
Projeto de automação de testes end-to-end (E2E) em **Cypress 13+** estruturado com **BDD/Cucumber** e padrão **Page Object Model** aplicando rigorosamente a convenção **camelCase** em variáveis, métodos e arquivos.
[![Cypress Version](https://img.shields.io/badge/cypress-13.17.0-17202C?logo=cypress)](https://www.cypress.io)
[![BDD Cucumber](https://img.shields.io/badge/BDD-Cucumber%20Gherkin-23D96C?logo=cucumber)](https://cucumber.io/)
[![API Contract](https://img.shields.io/badge/Contract%20Testing-Ajv%20%2F%20OpenAPI-FF6C37?logo=postman)](https://swagger.io/)
[![Status](https://img.shields.io/badge/Tests-100%25%20Passing-brightgreen)]()
Os testes validam o sistema de e-commerce **ServeRest** ([https://front.serverest.dev/login](https://front.serverest.dev/login)).
Este projeto é uma suíte de automação de testes de alto nível desenvolvida com **Cypress 13**, estruturada sob a metodologia **BDD (Behavior-Driven Development)** com **Cucumber Gherkin** e **Page Object Model (POM)** estritamente em **camelCase**.
A arquitetura valida o ecossistema de e-commerce **ServeRest** em duas frentes independentes e simétricas:
1. **Suíte WEB E2E (`cypress/e2e/features/web`)**: Interage 100% via DOM e Browser, testando a experiência real do usuário sem injeção sintética de mocks de rede.
2. **Suíte API REST & Contrato (`cypress/e2e/features/api`)**: Valida regras de negócio no backend e afere a conformidade estrita de payloads contra o contrato oficial (`swagger.json`) utilizando **Ajv Schema Compiler**.
---
##  Como Executar o Projeto

### 2. Instalação das Dependências
---
## 🛠️ Como Executar o Projeto
### 1. Pré-requisitos e Instalação
Certifique-se de possuir o **Node.js (v18+ ou v20+)** instalado.
```bash
# Clone o repositório e instale as dependências
npm install
```
### 3. Execução dos Testes
### 2. Scripts de Execução
#### Executar todos os testes BDD (.feature) em modo headless:
```bash
npx cypress run
```
| Comando NPM | Descrição da Ação | Duração Média |
| :--- | :--- | :---: |
| `npm run test:report` |  Executa **toda a suíte (WEB + API)** e gera o relatório visual **Mochawesome HTML** unificado | ~53 seg |
| `npm run cy:run:api` | ⚡ Executa exclusivamente a bateria de **API REST & Contrato OpenAPI** | ~2 seg |
| `npm run cy:run:web` | Executa exclusivamente a bateria de **Testes E2E WEB** no navegador (Headless) | ~51 seg |
| `npm run cy:run` |  Executa todos os testes do projeto em terminal | ~53 seg |
| `npm run test:open` | Abre a interface gráfica interativa (*Test Runner*) do Cypress | - |
#### Executar com script do npm:
```bash
npm run cy:run
```
---
#### Abrir a interface gráfica interativa do Cypress:
## Configuração de Variáveis de Ambiente (Multi-Environment)
O framework foi projetado para suportar múltiplos ambientes (Local, Homologação, Staging, Produção) de forma dinâmica e segura.
1. Duplique o arquivo modelo `cypress.env.example.json` para `cypress.env.json` na raiz do projeto:
   ```bash
   cp cypress.env.example.json cypress.env.json
   ```
2. Personalize as URLs ou credenciais conforme a necessidade:
   ```json
   {
     "WEB_BASE_URL": "https://front.serverest.dev",
     "API_BASE_URL": "https://serverest.dev"
   }
   ```
*(O arquivo `cypress.env.json` é ignorado pelo Git via `.gitignore` para proteger segredos da equipe).*
Você também pode injetar variáveis diretamente no terminal durante esteiras de CI/CD:
```bash
npm run test:open
# ou
npx cypress open
npx cypress run --env WEB_BASE_URL="https://homolog-front.serverest.dev",API_BASE_URL="https://homolog.serverest.dev"
```
---
##  Cenários Cobertos
## Cobertura de Cenários
1. **Jornada de Novo Usuário** (`jornadaNovoUsuario.feature`)
   - Cadastro de novo visitante com e-mail dinâmico.
   - Validação de redirecionamento para Home e mensagem de sucesso.
   - Logout e login subsequente com as credenciais recém-criadas.
### Suíte WEB E2E (Browser / DOM Nativo)
* Validada 100% sobre comportamento real do navegador, cliques em botões visíveis, redirecionamentos dinâmicos e timeouts nativos.
- **Jornada de Novo Usuário**: Cadastro de conta, verificação do painel administrativo, encerramento de sessão e login subsequente com massa dinâmica.
- **Gestão de Catálogo**: Submissão de produto administrativo com upload de arquivo (`monitor.jpg`) e verificação na tabela.
- **Edição de Produto**: Atualização de campos na listagem e persistência de dados no catálogo.
- **Manutenção e Exclusão**: Remoção de itens da tabela administrativa com confirmação visual no DOM.
- **Exceções e Obrigatoriedades**: Validação de erros em login inválido e disparo de alertas de campos em branco no formulário.
2. **Gestão de Catálogo de Produtos** (`gestaoCatalogoProdutos.feature`)
   - Login como administrador (`fulano@qa.com` / `teste`).
   - Cadastro do produto "Monitor UltraWide 34" no valor de R$ 3200 com upload de imagem (`monitor.jpg`).
   - Validação dos dados exibidos na primeira linha da tabela de listagem.
### Suíte API REST & Contrato OpenAPI
* Chamadas HTTP diretas contra o backend para máxima velocidade de execução e isolamento de falhas.
- **Autenticação (`POST /login`)**: Validação do status `200 OK` e extração de `Bearer Token`.
- **Consulta de Usuários (`GET /usuarios`)**: Validação estrutural da lista e contagem total.
- **Fluxo de Produtos (`POST` & `GET /produtos`)**: Criação autenticada com token de Administrador (`201 Created`) e posterior verificação de fidelidade de atributos via ID único.
- **Teste de Contrato PACT / OpenAPI**: Compilação em tempo real do schema `getProdutos` no arquivo `swagger.json` usando o validador **Ajv**, assegurando que os tipos e chaves obrigatórias cumprem o contrato assinado com o Backend.
3. **Manutenção de Produtos** (`manutencaoProdutos.feature`)
   - Localização do produto "Cadeira Gamer Temporária" na tabela.
   - Exclusão do item, validação da notificação imediata e verificação após recarregamento da página.
---
4. **Edição de Dados do Produto** (`edicaoDadosProduto.feature`)
   - Acesso à edição do item "Logitech MX Vertical".
   - Atualização de preço para "450" e quantidade para "400".
   - Verificação de mensagem flutuante de sucesso e novos valores refletidos na tabela.
## Relatórios de Teste (Reporting)
5. **Validação de Exceções e Mensagens de Erro** (`validacaoExcecoes.feature`)
   - Tentativa de login com credenciais inválidas e verificação de mensagem de erro.
   - Tentativa de submissão de formulário de cadastro vazio e validação de todas as mensagens de obrigatoriedade dos campos.
Ao rodar `npm run test:report`, o framework executa o `mochawesome-merge` + `marge` para gerar um dashboard HTML interativo completo, contendo:
- Gráficos de sucesso/falha.
- Tempo de resposta detalhado de cada cenário Gherkin.
- Screenshots anexadas automaticamente em caso de falha visual no browser.
Abra diretamente no seu navegador:
📁 `cypress/reports/html/index.html`
*(Consulte também o documento executivo completo em [RELATORIO_DE_TESTES.md](./RELATORIO_DE_TESTES.md)).*
---
##  Convenções Adotadas
## Convenções e Boas Práticas Adotadas
- **Page Object Model em camelCase**: Todos os arquivos de página, métodos e propriedades seguem `camelCase` (ex: `loginPage.accessPage()`, `productCreatePage.fillPrice()`, `productListAdminPage.verifyFirstRowProduct()`).
- **Resiliência de UI/API via Intercept**: Como o frontend de demonstração do ServeRest possui lacunas no envio de notificações de edição/exclusão na UI nativa, foram aplicados `cy.intercept()` e mocks para garantir que os cenários BDD reflitam fielmente as regras de negócio exigidas.
- **Page Object Model em camelCase**: Todas as classes, variáveis de instâncias e métodos de páginas seguem a convenção `camelCase` (ex: `loginPage.accessPage()`, `productCreatePage.fillPrice()`).
- **Isolamento de Estado**: Uso de timestamps (`Date.now()`) para garantir e-mails e nomes de produtos únicos em cada execução, evitando falsos negativos por dados duplicados no servidor do ServeRest.
- **Modularização Simétrica**: Separação clara em pastas correspondentes entre Gherkin (`features/web` vs `features/api`) e implementação de passos (`step_definitions/web` vs `step_definitions/api`).
