# language: pt
Funcionalidade: Autenticação na API do ServeRest (POST /login)
  Como consumidor da API do ServeRest
  Quero autenticar usuários cadastrados
  Para obter tokens de acesso (Bearer Token) válidos para requisições seguras

  @api @funcional @auth
  Cenário: Autenticação bem-sucedida na API do ServeRest via POST /login
    Dado que envio uma requisição POST para "/login" com credenciais de usuário recém-cadastrado via API
    Então a resposta da API deve retornar status 200
    E o corpo da resposta deve conter a mensagem "Login realizado com sucesso"
    E deve ser retornado um token de autorização válido
