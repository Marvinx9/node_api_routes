// processo de criar a tabela
exports.up = knex => knex.schema.createTable("links", table => {
    // criando campos na minha tabela
    table.increments("id");
    table.text("url").notNullable();
    // criando um campo do tipo inteiro, que faz uma referencia ao id que tem dentro da tabela do usuário. 
    // CASCADE - se as notas forem deletadas, delete também os links vinculadas a ela.
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    table.timestamp("created_at").default(knex.fn.now());
});

// processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("links");
