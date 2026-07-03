# language: pt
Funcionalidade: Edição de Dados do Produto
  Como um administrador do e-commerce
  Quero atualizar as informações de um produto já cadastrado
  Para manter os preços e estoques do catálogo corretos

  Cenário: Atualização do preço e quantidade de um produto com sucesso
    Dado que realizo login no sistema com credenciais de Administrador
    E navego pelo menu até "Listar Produtos"
    E a tabela exibe um produto chamado "Logitech MX Vertical"
    Quando clico no botão "Editar" na linha correspondente ao produto "Logitech MX Vertical"
    Então sou redirecionado para a tela de edição
    E os campos do formulário já devem vir preenchidos com os dados atuais do produto
    Quando limpo o campo "Preço" e preencho com "450"
    E limpo o campo "Quantidade" e preencho com "400"
    E clico no botão para salvar as edições
    Então devo ser redirecionado de volta para a "Lista dos Produtos"
    E a linha do produto "Logitech MX Vertical" na tabela deve refletir o novo Preço ("450") e a nova Quantidade ("400")
