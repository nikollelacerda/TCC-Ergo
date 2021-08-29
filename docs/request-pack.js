exports.model = {
    cadastro: {
        "nome":"",
        "email":"",
        "senha":""
    },
    login : {
        "email":"",
        "senha":""
    }
};

exports.validar = (req, model) => {
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

exports.log = (req) => {
    console.log(`\nRecebido requisição ${req.method.toUpperCase()} em ${req.path} de '${req.connection.remoteAddress}'...`);
}
