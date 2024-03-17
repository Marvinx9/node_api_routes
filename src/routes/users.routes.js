// importando o Router do express para poder utilizar nesse arquivo
const { Router } = require("express");

// constante userRoutes inicia Routes do express
const usersRoutes = Router()

// rota raiz da aplicação com apenas o '/' quando chamada, você pode acessar essa rota
usersRoutes.post("/", (request, response) => {
    // desestruturação de dados, vindos do body
    const { name, email, password } = request.body;

    response.json({ name, email, password });
});

// exportando para quem desejar utilizar esse arquivo, poder utilizar
module.exports = usersRoutes;