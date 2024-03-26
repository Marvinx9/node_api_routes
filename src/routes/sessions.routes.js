const { Router } = require("express");

const SessionsController = require("../controllers/SessionsController");
const { route } = require("express/lib/router");
// instanciando a classe
const sessionsController = new SessionsController();

const sessionsRoutes = Router();
sessionsRoutes.post("/", sessionsController.create);

module.exports = sessionsRoutes;
