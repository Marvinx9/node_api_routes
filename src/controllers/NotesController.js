const { response, request } = require("express");
const knex = require("../database/knex");

// controller de notas
class NotesController {
    async create(request, response) {
        // pegando os dados inseridos pelo usuário
        const { title, description, tags, links } = request.body;
        // pegando o id do usuário
        const { user_id } = request.params;

        // cadastrando as notas e coletando o id da nota gerada
        const note_id = await knex("notes").insert({
            title,
            description,
            user_id
        });

        // percorrendo para cada link cadastrado em note_id e retornando um objeto com o código da nota e alterando de link para url
        const linksInsert = links.map(link => {
            return {
                note_id,
                url: link
            }
        });

        await knex("links").insert(linksInsert);

        // fazendo o mesmo processo para tags
        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert);

        response.json();
    }
    
    // criando um metodo para mostrar as notas
    async show(request, response) {
        const { id } = request.params;

        // busca uma nota, tags e links em específico com base no id
        const note = await knex("notes").where({ id }).first();
        const tags = await knex("tags").where({ note_id: id }).orderBy("name");
        const links = await knex("links").where({ note_id: id }).orderBy("created_at");

        // retorna tudos os detalhes de note + tags e links
        return response.json({
            ...note,
            tags,
            links
        });
    }
}

module.exports = NotesController;
