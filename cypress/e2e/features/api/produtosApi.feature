# language: pt
Funcionalidade: Gestão de Produtos na API do ServeRest (/produtos)
  Como consumidor e administrador autenticado da API do ServeRest
  Quero cadastrar e consultar produtos via endpoints REST
  Para garantir o ciclo de vida de catálogo de produtos via back-end

  @api @funcional @produtos
  Cenário: Cadastro de um novo produto na API via POST /produtos com token de Administrador
    Dado que obtenho um token de Administrador autenticado pela API
    Quando envio uma requisição POST para "/produtos" na API com os dados de um novo produto exclusivo
    Então a resposta da API deve retornar status 201
    E o corpo da resposta deve conter a mensagem "Cadastro realizado com sucesso"
    E a propriedade "_id" do novo produto deve ser retornada

  @api @funcional @produtos
  Cenário: Consulta de produto recém-criado por ID na API via GET /produtos/{_id}
    Dado que existe um produto cadastrado via API para consulta de ID
    Quando envio uma requisição GET para o endpoint do produto recém-criado
    Então a resposta da API deve retornar status 200
    E o corpo da resposta deve corresponder exatamente aos dados do produto cadastrado
