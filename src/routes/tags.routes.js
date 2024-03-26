// importando o Router do express para poder utilizar nesse arquivo
const { Router } = require("express");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

// importando o controller para ativar quando alguma rota for chamada
const TagsController = require("../controllers/TagsController");

// constante TagsRoutes inicia Routes do express
const tagsRoutes = Router();

// criando uma nova instância para 'notesController'
const tagsController = new TagsController();

// rota raiz da aplicação com apenas o '/' quando chamada, você pode acessar essa rota
tagsRoutes.get("/", ensureAuthenticated, tagsController.index);


// exportando para quem desejar utilizar esse arquivo, poder utilizar
module.exports = tagsRoutes;