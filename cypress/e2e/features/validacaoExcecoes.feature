# language: pt
Funcionalidade: Validação de Exceções e Mensagens de Erro
  Como um usuário do sistema ServeRest
  Quero receber feedback claro caso meus dados estejam incorretos ou incompletos
  Para entender o motivo da falha na minha ação

  Cenário: Tentativa de login com credenciais inválidas
    Dado que acesso a página de "Login"
    Quando preencho o campo "Email" na tela de login com "usuario_inexistente@qa.com"
    E preencho o campo "Senha" na tela de login com "senhaIncorreta123"
    E clico em "Entrar"
    Então devo permanecer na página de "Login"
    E devo visualizar a mensagem de erro "Email e/ou senha inválidos"

  Cenário: Tentativa de cadastro sem preencher campos obrigatórios
    Dado que acesso a página de "Cadastro"
    Quando clico no botão "Cadastrar" sem preencher nenhum campo
    Então devo permanecer na página de "Cadastro"
    E devo visualizar a mensagem de erro "Nome é obrigatório"
    E devo visualizar a mensagem de erro "Email é obrigatório"
    E devo visualizar a mensagem de erro "Password é obrigatório"
