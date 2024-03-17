// esse arquivo junta todas as minhas rotas da aplicação
// importando Router do express
const { Router } = require("express");
// importando userRoutes do arquivo users.routes
const usersRouter = require("./users.routes")

// executando o Routes e atribuindo a variável 'routes'
const routes = Router();

// sempre que alguêm acessar o meu '/users' será redirecionado para o meu 'usersRouter' que é o grupo de rotas do usuário.
routes.use("/users", usersRouter);

// exportando arquivo para quem precisar utilizar
module.exports = routes;
