// importando o meu sqliteConnection para dentro desse arquivo
const sqliteConnection = require('../../sqlite');

// importando o meu createUsers para dentro do meu arquivo
const createUsers = require('./createUsers')

// criando uma função que contém as migrations dos comandos sql
async function migrationsRun() {
    const schemas = [
        createUsers
        //join serve para juntar as migrations
    ].join('');
    //chamando a função de conexção com o sql
    sqliteConnection()
    // executando as minhas migrations
    .then(db => db.exec(schemas))
    // no caso de algum erro faça isso
    .catch(error => console.error(error));
}

// exportando minha migration
module.exports = migrationsRun;
