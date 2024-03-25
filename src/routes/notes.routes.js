// importando o Router do express para poder utilizar nesse arquivo
const { Router } = require("express");

// importando o controller para ativar quando alguma rota for chamada
const NotesController = require("../controllers/NotesController");

// constante NotesRoutes inicia Routes do express
const notesRoutes = Router();

// criando uma nova instância para 'notesController'
const notesController = new NotesController();

// rota raiz da aplicação com apenas o '/' quando chamada, você pode acessar essa rota
notesRoutes.get("/", notesController.index);
notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);


// exportando para quem desejar utilizar esse arquivo, poder utilizar
module.exports = notesRoutes;