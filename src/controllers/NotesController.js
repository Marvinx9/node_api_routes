const knex = require("../database/knex");

// controller de notas
class NotesController {
    async create(request, response) {
        // pegando os dados inseridos pelo usuário
        const { title, description, tags, links } = request.body;
        // pegando o id do usuário
        const user_id = request.user.id;

        // cadastrando as notas e coletando o id da nota gerada
        const note_id = await knex("notes").insert({
            title,
            description,
            user_id
        });
        // percorrendo para cada link cadastrado em note_id e retornando um objeto com o código da nota e alterando de link para url
        const linksInsert = links.map(link => {
            return {
                note_id: Number(note_id),
                url: link
            }
        });
        
        await knex("links").insert(linksInsert);

        // fazendo o mesmo processo para tags
        const tagsInsert = tags.map(name => {
            return {
                note_id: Number(note_id),
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert);

        return response.json();
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

    // criando método de Delete
    async delete(request, response) {
        const { id } = request.params;
        await knex( "notes" ).where({ id }).delete();
        await knex( "links" ).where({ note_id: id }).delete();
        await knex( "tags" ).where({ note_id: id }).delete();

        return response.json();
    }

    // método para listar as funções
    async index(request, response) {
        const { title, tags } = request.query;

        const user_id = request.user.id;

        let notes;
        if(tags) {
            // separando as tags de um texto simples para um vetor separado por vírgula
            // pegando os parâmetros enviados pelo usuário no campo tags para aplicar o filtro
            // trim remove os espaços vazios enquanto o => percorre cada elemento-tag do vetor
            const filterTags = tags.split(',').map(tag => tag.trim());

            notes = await knex("tags")
            .select([
                "notes.id",
                "notes.title",
                "notes.user_id",
            ])
            .where("notes.user_id", user_id)
            .whereLike( "notes.title", `%${title}%` )
            // pesquisando baseado na tag
            // comparando se a tag existe no campo name de tags
            .whereIn("name", filterTags)
            .innerJoin("notes", "notes.id", "tags.note_id")
            .orderBy("notes.title")

        } else {
            notes = await knex("notes")
            .where({ user_id })
            //verifica tanto antes como depois se contém no texto essa palavra
            .whereLike("title", `%${title}%`)
            .orderBy("title");
        }

        // filtro + map para retornar a tag que corresponde ao note.id + tudo de note
        const userTags = await knex("tags").where({ user_id });
        const notesWithTags = notes.map( note => {
            const noteTags = userTags.filter( tag => tag.note_id === note.id);
            return {
                ...note,
                tags: noteTags
            }
        });

        return response.json( notesWithTags );
    }
}

module.exports = NotesController;
