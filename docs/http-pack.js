/* REQUEST PACK */
let request = {};

request.model = {
    cadastro: {
        "nome":"",
        "email":"",
        "senha":""
    },
    login: {
        "email":"",
        "senha":""
    },
    update: {
        "uid":""
    },
    delete: {
        "uid":"",
        "senha":""
    }
};

request.validar = (req, model) => {
    if(typeof(req) != typeof({}))
        return false;

    for(let mkey in model){
        let ok = false;
        for(let rkey in req){
            if(mkey == rkey){
                ok = true;
                break;
            }     
        }
        if(!ok){
            return false;
        } 
    }
    return true;
};

request.log = (req) => {
    console.log(`\nRecebido requisição ${req.method.toUpperCase()} em ${req.path} de '${req.connection.remoteAddress}'...`);
};

/* RESPONSE PACK*/
let response = {};

response.status = {
    falha:    {cod: 400, msg: "Falha ao processar requisição"},
    sucesso:  {cod: 200, msg: "Sucesso ao processar requisição"},
    banco:    {cod: 500, msg: "Erro no banco de dados"},
    nenhum:   {cod: 200, msg: "Nenhuma correspondência no banco de dados"},
    cadastro: {cod: 201, msg: "Cadastrado com sucesso"},
    email:    {cod: 200, msg: "Endereço de e-mail duplicado"},
    login:    {cod: 200, msg: "Sucesso em realizar login no sistema"},
    update:   {cod: 200, msg: "Sucesso ao atualizar informações"},
    delete:   {cod: 200, msg: "Sucesso ao deletar informações"}
}

exports._request = request;
exports._response = response;