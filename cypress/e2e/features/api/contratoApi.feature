# language: pt
Funcionalidade: Testes de Contrato (PACT / OpenAPI) para a API ServeRest
  Como engenheiro de qualidade e automação
  Quero validar se os schemas das respostas da API cumprem integralmente a especificação do provedor
  Para prevenir falhas de quebra de contrato (breaking changes) entre microsserviços e front-end

  @api @contrato @pact
  Cenário: Validação do contrato (PACT / OpenAPI) da resposta do endpoint GET /produtos contra o swagger.json
    Quando envio uma requisição GET para "/produtos" na API ServeRest
    Então a resposta da API deve retornar status 200
    E a estrutura do payload retornado deve cumprir integralmente o contrato PACT/OpenAPI definido no arquivo "swagger.json" para o schema "getProdutos"
