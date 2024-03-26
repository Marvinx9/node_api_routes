const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
    async create(request, response) {
        const { email, password } = request.body;

        const user = await knex("users").where({ email }).first();

        // se o usuário existe
        if(!user) {
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        // comparando a senha enviada pelo usuário com a cadastrada no db
        const passwordMatched = await compare(password, user.password);
        
        if(!passwordMatched) {
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }
        
        // criando token do usuário válido por 1d
        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, { subject: String( user.id ), expiresIn});

        return response.json({ user, token });
    }
}

module.exports = SessionsController;
