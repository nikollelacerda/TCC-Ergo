/* Importando pacotes */
const express = require('express');
const postgres = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const httpPack = require('./http-pack.js');
const _request = httpPack._request;
const _response = httpPack._response;

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

/* Cadastro de Usuario */
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
            console.log('... Realizando Query: Buscar Usuario')
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
            console.log('... Realizando Query: Inserir Usuario')
            await client.query({
                text: "INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING uid, nome, email",
                values: [request.body.nome, request.body.email, request.body.senha]
            })
            .catch(erroConsulta)
            .then(result => {
                response.status(_response.status.cadastro.cod).json({
                    status:_response.status.cadastro.msg,
                    data: result.rows[0]
                });
                console.log('... Usuario Cadastrado com sucesso!')
            })
            
        }catch(err){ /* Recebe qualquer erro que aconteça e retorna uma resposta */
            respostaPadraoErro(err, response);
        }
    }
);

/* Login de Usuario*/
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
            console.log('... Realizando Query: Buscar Usuario');
            await client.query({
                text: `SELECT uid FROM usuario WHERE email = $1 AND senha = $2`,
                values: [request.body.email, request.body.senha]
            })
            .catch(erroConsulta)
            .then(result => {
                if(result.rows.length <= 0){
                    throw {
                        status: _response.status.nenhum,
                        log: "... Usuario não encontrado"
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
            respostaPadraoErro(err, response);
        }
    }
);

/* Atualizar Usuario */
app.patch(
    '/api',
    (request, response, next) => {
        _request.log(request);

        /* Validação do formato da request */
        validarRequisicao(request.body, _request.model.update, response, next);
    },
    async function(request, response){
        try{
            let usuario;
            let uid = request.body.uid;
            delete request.body.uid;

            /* Faz uma query no banco para buscar o usuário e checar os parametros da tabela (nome, email, etc) */
            console.log('... Realizando Query: Buscar Usuario');
            await client.query({
                text: "SELECT * FROM usuario WHERE uid = $1",
                values: [uid]
            })
            .catch(erroConsulta)
            .then(result => {
                /* Se não encontrar nenhum usuário emite um erro. */
                if(result.rows.length <= 0){
                    throw {
                        status: _response.status.nenhum,
                        log: '... Usuario não encontrado'
                    }
                }
                /* Itera pelos parametros da requisição, 
                comparando-os com os parametros do usuário retornado */
                usuario = result.rows[0];
                for(let body_param in request.body){
                    let ok = false;
                    for(let available_param in usuario){
                        if(body_param == available_param){
                            ok = available_param;
                            break;
                        }
                    }
                    /* SE o parametro da requisição existir na tabela usuário 
                    então deleta o parametro no objeto usuário para evitar repetições. */
                    /* SE NÂO existir então deleta o parametro no objeto da requisição, já que não será usado. */
                    if(ok){
                        delete usuario[ok];
                    } else {
                        delete request.body[body_param];
                    }
                }
            });

            /* Se não sobrar nenhum parametro na requisição depois da filtragem, então emite um erro. */
            if(Object.keys(request.body).length <= 0){
                throw {
                    status: _response.status.falha,
                    log: "... Impossível Atualizar: Requisição não contem informações para atualizar"
                }
            }

            /* Define um modelo para a criar a query dinamicamente */
            let query = { 
                text: "UPDATE usuario SET ? WHERE uid=$1 RETURNING uid, ??",
                values: [uid]
            };

            /* Começando a contar do valor $2, já que o $1 esta sendo usado para o UID */
            let count = 2;

            /* Itera pelos parametros da request */
            for(let param in request.body){
                /* Substitui o valor ? por nome=$2 por exemplo, seguido de ? para dar continuidade ao loop 
                EXEMPLO: '?' => 'senha=$3, ?' */
                query.text = query.text.replace(/[?]{1}/, `${param}=$${count++}, ?`);

                /* Faz a mesma coisa que o anterior, mas agora nas informações que serão retornadas na query.
                EXEMPLO: '??' => 'senha, ??' */
                query.text = query.text.replace(/[?]{2}/, `${param}, ??`);
                query.values.push(request.body[param]);
            }
            /* Limpa a query, removento todos os '?' e ',' soltos. */
            query.text = query.text.replace(/(, [?]+)/g, '');

            /* Faz a query definida anteriormente para atualizar o usuário 
            com os dados válidos mandados na requisição */
            console.log('... Realizando Query: Atualizar Usuario');
            await client.query(query)
            .catch(erroConsulta)
            .then(result => {
                console.log('... Sucesso ao atualizar dados do usuário de uid ' + uid);
                response.status(_response.status.update.cod).json({
                    status: _response.status.update.msg,
                    data: result.rows[0]
                });
            });
        }catch(err){
            respostaPadraoErro(err, response);
        }
    }
);

/* Deletar Usuario */
app.delete(
    '/api',
    (request, response, next) => {
        _request.log(request);

        /* Validação do formato da request */
        validarRequisicao(request.body, _request.model.update, response, next);
    },
    async function(request, response){
        try{
            console.log('... Realizando Query: Deletar Usuário');
        await client.query({
            text: 'DELETE FROM usuario WHERE uid=$1 AND senha=$2 RETURNING *',
            values: [request.body.uid, request.body.senha]
        })
        .catch(erroConsulta)
        .then(result => {
            if(result.rows.length <= 0){
                throw {
                    status: _response.status.nenhum,
                    log: '... Usuario não encontrado'
                }
            }

            response.status(_response.status.delete.cod).json({
                status: _response.status.delete.msg,
                data: result.rows[0]
            });
            console.log('... Sucesso ao deletar usuario de uid', request.body.uid);
        });
        }catch(err){
            respostaPadraoErro(err, response);
        }
    }
)

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
            respostaPadraoErro(err, response);
        }
    }
);

app.listen(
    SERVER_PORT,
    function(){
        console.log(`Servidor iniciado, ouvindo a porta ${SERVER_PORT}...`);
        conectarCliente();
    }
);

/*** Funções Comuns ***/

/* Coneta ao cliente de banco de dados, tratando todos os erros. */
async function conectarCliente(){
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
function respostaPadraoErro(err, response){
    if(err.status && err.log){
        console.error(err.log);
        response.status(err.status.cod).json({status: err.status.msg});
    } else {
        console.error('Erro não especificado:', err);
        response.status(_response.status.falha.cod).send(_response.status.falha.msg);
    }
    
}

/* Função para gerar uma chave para o Token de Sessão */
function gerarChave(len){
    /* Gera uma chave através de número pseudo-aleatório */
    return Math.random().toString(16).substr(2, len+2);
    /* TODO: usar uma api com números aleatórios verdadeiros
    ex. Random.org */
}