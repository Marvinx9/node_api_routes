require("express-async-errors");

// importando a função database
const database = require("./database/sqlite");

// chamando todo o módulo express
const express = require('express');

// carregando todo o arquivo index.js - não foi colocado o /index.js porque por padrão ele já é acesado
const routes = require("./routes");

// importando o AppError
const AppError = require("./utils/AppError");

// inicializando o express
const app = express();

// informando para o node que as informações que virão do body, serão no formato .json
app.use(express.json());

// rodando minhas rotas importadas - inicio
app.use(routes);

// iniciando o banco de dados
database();

app.use(( error, request, response, next ) => {
    // verificando se o erro veio do lado cliente ou do meu servidor
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }
    console.error(error);
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});

// constante que tem a porta que vai atender a essas requisições
const PORT = 3333;

// observa a porta 3333 e executa uma função quando iniciado a aplicação
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
