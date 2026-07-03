# language: pt
Funcionalidade: Manutenção de Produtos
  Como um administrador do sistema
  Quero poder excluir produtos obsoletos
  Para manter o catálogo atualizado

  Cenário: Exclusão de um produto existente na tabela
    Dado que realizo login no sistema com credenciais de Administrador
    E que existe um produto previamente cadastrado chamado "Cadeira Gamer Temporária"
    E navego pelo menu até "Listar Produtos"
    Quando localizo a linha correspondente ao produto "Cadeira Gamer Temporária"
    E clico no botão "Excluir" desta linha específica
    Então a linha contendo "Cadeira Gamer Temporária" deve desaparecer da tabela imediatamente
    E ao recarregar a página, o produto não deve voltar a ser exibido
