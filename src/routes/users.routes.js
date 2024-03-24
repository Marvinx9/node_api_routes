// importando o Router do express para poder utilizar nesse arquivo
const { Router } = require("express");

// importando o controller para ativar quando alguma rota for chamada
const UsersController = require("../controllers/UsersController");

// constante userRoutes inicia Routes do express
const usersRoutes = Router();

// criando uma nova instância para 'userController'
const usersController = new UsersController();

// rota raiz da aplicação com apenas o '/' quando chamada, você pode acessar essa rota
usersRoutes.post("/", usersController.create);

usersRoutes.put("/:id", usersController.update);

// exportando para quem desejar utilizar esse arquivo, poder utilizar
module.exports = usersRoutes;