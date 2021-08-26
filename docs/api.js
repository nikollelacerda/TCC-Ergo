const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postgres = require('pg');

const SERVER_PORT = 3000;
const client = new postgres.Client({
    host:'localhost',
    port: 5432,
    user:'postgres',
    password:'postgres',
    database:'PPI'
});

const app = new express();
app.use(cors());
app.use(bodyParser());

app.listen(
    SERVER_PORT,
    function(){
        console.log(`Servidor iniciado, ouvindo a porta ${SERVER_PORT}...`)
    }
);
