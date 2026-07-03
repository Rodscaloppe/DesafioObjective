# language: pt
Funcionalidade: Jornada de Novo Usuário
  Como um novo visitante
  Quero me cadastrar no sistema e fazer login
  Para poder acessar a plataforma

  Cenário: Cadastro com sucesso seguido de login
    Dado que acesso a página de "Cadastro"
    Quando preencho "Nome" com um nome dinâmico válido
    E preencho "Email" com um e-mail dinâmico não registrado
    E preencho "Senha" com uma senha válida
    E deixo a opção "Cadastrar como administrador?" desmarcada
    E clico no botão "Cadastrar"
    Então devo ver a mensagem de "Cadastro realizado com sucesso"
    E devo ser redirecionado para a página "Home"
    Quando clico no botão "Logout"
    E preencho a página de "Login" com o e-mail e senha recém-criados
    E clico em "Entrar"
    Então sou redirecionado para a página "Home" novamente
    E a sessão do usuário deve estar ativa
