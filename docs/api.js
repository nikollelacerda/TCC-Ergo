const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postgres = require('pg');

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
    async function(request, response){
        console.log(`\nRecebido requisicao PUT em /api de '${request.connection.remoteAddress}'...`);

        /* Validação do formato da request */
        let ok = _request.validar(request.body, _request.model.cadastro)
        ok || response.status(_response.status.fail.cod).json({
            status: _response.status.fail.msg,
            data: request.body
        });

        try{
            /* Faz uma query no banco para checar se ja há um usuário com aquele email */
            console.log('... Realizando Query: Buscando Usuario')
            await client.query({
                text: "SELECT * FROM usuario WHERE email = $1",
                values: [request.body.email]
            })
            .catch(erro_consulta)
            .then(result => {
                if(result.rows.length > 0){
                    throw {
                        status: _response.status.email,
                        log: "... Impossivel Cadastrar: Usuario duplicado"
                    }
                }
            })

            /* Faz uma query no banco para inserir o usuario */
            console.log('... Realizando Query: Inserindo Usuario')
            await client.query({
                text: "INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
                values: [request.body.nome, request.body.email, request.body.senha]
            })
            .catch(erro_consulta)
            .then(result => {
                response.status(201).json(result.rows);
                console.log('...Usuario Cadastrado com sucesso!')
            })
            
        }catch(err){ /* Recebe qualquer erro que aconteça e retorna uma resposta */
            console.error(err.log);
            response.status(err.status.cod).send(err.status.msg);
        }
    }
);

/* Login */
app.post(
    '/api',
    function(request, response){
        let ok = _request.validar(request.body, _request.model.login)
        ok || response.status(400).json({
            status: _response.status.fail,
            data: request.body
        });

        response.send('ok');
    }
);

app.listen(
    SERVER_PORT,
    function(){
        console.log(`Servidor iniciado, ouvindo a porta ${SERVER_PORT}...`);
        conectar_ao_cliente();
    }
);

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

function erro_consulta(e){
    let error;
    if(e.type && e.type == "internal"){
        error = e.error;
    } else {
        error = {
            status: _response.status.banco,
            log: `... Erro na consulta: ${e.stack}`
        }
    }
    throw error
}