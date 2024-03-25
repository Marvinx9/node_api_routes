// processo de criar a tabela
exports.up = knex => knex.schema.createTable("tags", table => {
    // criando campos na minha tabela
    table.increments("id");
    table.text("name").notNullable;
    // criando um campo do tipo inteiro, que faz uma referencia ao id que tem dentro da tabela do usuário. 
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
});

// processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("tags");
