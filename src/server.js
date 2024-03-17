// chamando todo o módulo express
const express = require('express');

// carregando todo o arquivo index.js - não foi colocado o /index.js porque por padrão ele já é acesado
const routes = require("./routes")

// inicializando o express
const app = express();

// informando para o node que as informações que virão do body, serão no formato .json
app.use(express.json());

// rodando minhas rotas importadas - inicio
app.use(routes);

// constante que tem a porta que vai atender a essas requisições
const PORT = 3333;

// observa a porta 3333 e executa uma função quando iniciado a aplicação
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
