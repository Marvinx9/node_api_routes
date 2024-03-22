// importando o meu AppError
const AppError = require("../utils/AppError");

// criando classe para acessar várias funções desse controller
class UsersController {
    //criando controller de create
    create(request, response) {
        //acessando o body dentro da request
        const { name, email, password } = request.body;

        // inserindo tratamento de erro
        if (!name) {
            throw new AppError("Nome é obrigatório!");
        }

        //usando o response para devolver por meio de um Json uma resposta
        response.status(201).json({ name, email, password });
    }

}

module.exports = UsersController;
