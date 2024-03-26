const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated( request, response, next ) {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("JWT Token não informado", 401);
    }

    //pegando a variável token do authHeader ao quebrar a variável em um array
    const [, token] = authHeader.split(" ");

    try {
        // verificando se o código é um jwt válido
        // alias, passando o nome sub para user_id
        const { sub: user_id} = verify(token, authConfig.jwt.secret);
        request.user = {
            // guardando o valor como número
            id: Number(user_id)
        };
        
        // se der tudo certo, retorna o next para chamar a função destino do middleware
        return next();
        // caso a chave não bata, token inválido
    } catch {
        throw new AppError("JWT Token inválido", 401)
    }
}

module.exports = ensureAuthenticated;
