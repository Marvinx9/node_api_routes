// importando o meu AppError
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");
const { Database } = require("sqlite3");

// criando classe para acessar várias funções desse controller
class UsersController {
    //criando controller de create
    async create(request, response) {
        //acessando o body dentro da request
        //pegando as informações enviadas pelo usuário
        const { name, email, password } = request.body;
        
        //realizando a conexão com o banco de dados
        const database = await sqliteConnection();
        //verificando se existe um usuário com um email em específico
        const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])
        // caso o email informado já exista entre nessa mensagem de erro
        if(checkUserExist){
            throw new AppError("Email já cadastrado.");
        }
        await database.run(
            "INSERT INTO users (name, email, password) VALUES(?, ?, ?)",
            [name, email, password]
        );
        // se o email não existir no db então retorne o código 201 de sucesso
        return response.status(201).json();
    }
}

module.exports = UsersController;
