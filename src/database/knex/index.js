// trazendo as configurações do knex
const config = require("../../../knexfile");
const knex = require("knex");

// criando a conexão do knex

const connection = knex(config.development);

module.exports = connection;
