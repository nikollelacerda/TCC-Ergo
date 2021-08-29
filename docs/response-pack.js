exports.status = {
    falha:    {cod: 400, msg: "Falha ao processar requisição"},
    sucesso:  {cod: 200, msg: "Sucesso ao processar requisição"},
    banco:    {cod: 500, msg: "Erro no banco de dados"},
    nenhum:   {cod: 200, msg: "Nenhuma correspondência no banco de dados"},
    cadastro: {cod: 201, msg: "Cadastrado com sucesso"},
    email:    {cod: 200, msg: "Endereço de e-mail duplicado"},
    login:    {cod: 200, msg: "Sucesso em realizar login no sistema"}
};
