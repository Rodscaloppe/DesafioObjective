# language: pt
Funcionalidade: Gestão de Catálogo de Produtos
  Como um administrador do sistema
  Quero cadastrar novos produtos
  Para que eles fiquem disponíveis na vitrine

  Cenário: Cadastro de novo produto e validação na listagem
    Dado que realizo login no sistema com credenciais de Administrador
    E navego pelo menu até "Cadastrar Produtos"
    Quando preencho o campo "Nome" com "Monitor UltraWide 34"
    E preencho "Preço" com "3200"
    E preencho "Descrição" com "Monitor focado em produtividade"
    E preencho "Quantidade" com "10"
    E realizo o upload do arquivo "monitor.jpg" no campo "Imagem"
    E submeto o formulário clicando em "Cadastrar"
    Então sou redirecionado para a página "Lista dos Produtos"
    E o produto "Monitor UltraWide 34" deve ser exibido na tabela
    E o preço exibido na tabela deve ser "3200"
    E a quantidade exibida na tabela deve ser "10"
