# language: pt
Funcionalidade: Gestão de Usuários na API do ServeRest (/usuarios)
  Como consumidor da API do ServeRest
  Quero consultar e gerenciar os usuários cadastrados
  Para validar a integridade dos dados e paginação da API

  @api @funcional @usuarios
  Cenário: Consulta da lista de usuários na API via GET /usuarios
    Quando envio uma requisição GET para "/usuarios" na API
    Então a resposta da API deve retornar status 200
    E o corpo da resposta deve conter a propriedade "quantidade" como número
    E a lista "usuarios" deve ser um array não vazio contendo campos como nome, email e administrador
