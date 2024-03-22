// import drives para iniciar o db
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
// resolve os problemas de endereço de acordo com o ambiente
const path = require("path");

// função assincrona que inicia a conecção com o sqlite
async function sqliteConnection() {
    //constante que abre a conexão com o sqlite
    const database = await sqlite.open({
        // (__dirname) pega o local onde eu me encontro dentro do projeto
        // indo para a pasta database.db
        filename: path.resolve(__dirname, "..", "database.db"),
        driver: sqlite3.Database
    });
    return database;
}

// exportando a conexão com o banco de dados
module.exports = sqliteConnection;
