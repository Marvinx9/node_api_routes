// importando função para criptografia e de comparação
const { hash, compare } = require("bcryptjs");
// importando o meu AppError
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");
const { Database } = require("sqlite3");

// criando classe para acessar várias funções desse controller
class UsersController {
    //criando controller para create
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

        // encriptando a senha do usuário antes de inserir a linha no db
        const hashedPassword = await hash(password, 8);

        await database.run(
            "INSERT INTO users (name, email, password) VALUES(?, ?, ?)",
            [name, email, hashedPassword]
        );
        // se o email não existir no db então retorne o código 201 de sucesso
        return response.status(201).json();
    }
    //criando controller para update
    async update(request, response) {
        //pega as informações enviadas pelo usuário
        const { name, email, password, old_password } = request.body;
        // pega o id único do usuário
        const user_id = request.user.id;
        // inicia o db
        const database = await sqliteConnection();
        // realiza a busca pelo usuário por meio do id
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);
        // verifica se o usuário existe no db
        if(!user) {
            throw new AppError("Usuário não encontrado");
        }
        // caso o usuário exista, faça
        // pegue todos os campus do usuário com esse email
        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
        // verifica se o email que o usuário deseja atualizar já existe e se o dono desse email é diferente no dono desse email
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Esta email já está em uso.");
        }
        // caso passe nesses testes, as informações enviadas são atualizadas para essas variáveis
        // ?? se existir conteúdo dentro de name, utilize ele, senão existir, então utilize o conteúdo de user.name
        // nullish operator ??
        user.name = name ?? user.name;
        user.email = email ?? user.email;

        // verificando se o usuário informou a senha nova e a senha antiga
        if(password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha.")
        }

        // vendo se a senha antiga é realmente a que esta cadastrada no banco 
        if(password && old_password) {
            // linha que compara se as senhas realmente batem
            const checkOldPassword = await compare(old_password, user.password); 
            if(!checkOldPassword) {
                throw new AppError("A senha antiga não confere.")
            }
            // se passar por essas condicionais atualize a senha
            user.password = await hash(password, 8);  
        }

        // comando sql para realizar o update no database
        // no update_at estou passando a data por meio de um comando para o sql ao invés de passar a informação pronta.
            await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id]
        );

        //retorne uma mensagem do tipo json vazia para o usuário
        return response.json();
    }
}


module.exports = UsersController;
