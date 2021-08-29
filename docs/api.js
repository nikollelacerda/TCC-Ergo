/* Importando pacotes */
const express = require('express');
const postgres = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const _request = require('./request-pack.js');
const _response = require('./response-pack.js');

const SERVER_PORT = 3000;
const client = new postgres.Client({
    host:'localhost',
    port: 5432,
    user:'postgres',
    password:'postgres',
    database:'ergo'
});

const app = new express();
app.use(cors());
app.use(bodyParser());

/* Cadastro */
app.put(
    '/api',
    (request, response, next) => { 
        _request.log(request);

        /* Validação do formato da request */
        validarRequisicao(request.body, _request.model.cadastro, response, next);
    },
    async function(request, response){
       

        try{
            /* Faz uma query no banco para checar se ja há um usuário com aquele email */
            console.log('... Realizando Query: Buscando Usuario')
            await client.query({
                text: "SELECT * FROM usuario WHERE email = $1",
                values: [request.body.email]
            })
            .catch(erroConsulta)
            .then(result => {
                if(result.rows.length > 0){
                    throw {
                        status: _response.status.email,
                        log: "... Impossivel Cadastrar: Usuario duplicado"
                    }
                }
            });

            /* Faz uma query no banco para inserir o usuario */
            console.log('... Realizando Query: Inserindo Usuario')
            await client.query({
                text: "INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING uid, nome, email",
                values: [request.body.nome, request.body.email, request.body.senha]
            })
            .catch(erroConsulta)
            .then(result => {
                response.status(_response.status.cadastro.cod).json({
                    status:_response.status.cadastro.msg,
                    data: result.rows
                });
                console.log('... Usuario Cadastrado com sucesso!')
            })
            
        }catch(err){ /* Recebe qualquer erro que aconteça e retorna uma resposta */
            repostaPadraoErro(err, response);
        }
    }
);

/* Login */
app.post(
    '/api',
    (request, response, next) => {
        _request.log(request);

        /* Validação do formato da request */
        validarRequisicao(request.body, _request.model.login, response, next);
    },
    async function(request, response){

        try{
            /* Faz uma query no banco para procurar o usuario correspondente */
            console.log('... Realizando Query: Buscando Usuario');
            await client.query({
                text: `SELECT uid FROM usuario WHERE email = $1 AND senha = $2`,
                values: [request.body.email, request.body.senha]
            })
            .catch(erroConsulta)
            .then(result => {
                if(result.rows.length <= 0){
                    throw {
                        status: _response.status.nenhum,
                        log: "... Falha no Login: Usuario não encontrado"
                    }
                }
                let uid = result.rows[0].uid;
                console.log('... Usuário encontrado com uid ' + uid);

                let token = gerarChave(10);
                console.log('... Token de Sessão gerado: ' + token);
                /* TODO: salvar no banco de dados */

                response.status(_response.status.login.cod).json({
                    status: _response.status.login.msg,
                    token: token,
                    uid: uid
                });
            });
        }catch(err){
            repostaPadraoErro(err, response);
        }
    }
);

/* Buscar Alongamentos */
app.get(
    '/api/alongs/:id?', /* Parametro ID é opcional */
    async function(request, response){
        _request.log(request);

        let query = 'SELECT * FROM alongamento';
        if(request.params.id){
            query = {
                text: query + ' WHERE cod_alongamento = $1',
                values: [request.params.id]
            }
        }
        try{
            console.log('... Realizando Query: Buscando Alongamento');
            await client.query(query)
            .catch(erroConsulta)
            .then(result => {
                if(result.rows.length <= 0){
                    throw {
                        status: _response.status.nenhum,
                        log: '... Nenhum codigo de alongamento encontrado: ' + request.params.id
                    }
                }
                response.status(_response.status.sucesso.cod).json({
                    status: _response.status.sucesso.msg,
                    data: result.rows
                })
            });
        }catch(err){
            repostaPadraoErro(err, response);
        }
    }
);

app.listen(
    SERVER_PORT,
    function(){
        console.log(`Servidor iniciado, ouvindo a porta ${SERVER_PORT}...`);
        conectar_ao_cliente();
    }
);

/* Funções Comuns */
async function conectar_ao_cliente(){
    try{
        console.log('Conectando ao banco de dados...')
        await client.connect();
    }/* Se não conseguir envia uma resposta de erro */
    catch(e){
        console.error("... Erro ao conectar ao cliente: " + e);
        return;
    }
    console.log('... Conectado!')
}

/* Compara o conteudo da requisição com um modelo
CASO NÃO seja igual ao modelo, manda uma resposta de falha 
CASO seja ele continua para a proxima função na fila (next) */
function validarRequisicao(req, model, res, next){
    let ok = _request.validar(req, model)
    if(!ok){
        res.status(_response.status.falha.cod).json({
            status: _response.status.falha.msg,
            data: req
        });
        console.log('... Erro: Formato de requisição inválido!')
        return;
    }
    next();     
}

/* Erro padrão para consulta no banco de dados*/
function erroConsulta(e){
    throw {
        status: _response.status.banco,
        log: `... Erro na consulta: ${e.stack}`
    }
}

/* Procedimento padrão a ser usado nos catchs */
function repostaPadraoErro(err, response){
    console.error(err.log);
    response.status(err.status.cod).json({status: err.status.msg});
}

/* Função para gerar uma chave para o Token de Sessão */
function gerarChave(len){
    /* Gera uma chave através de número pseudo-aleatório */
    return Math.random().toString(16).substr(2, len+2);
    /* TODO: usar uma api com números aleatórios verdadeiros
    ex. Random.org */
}