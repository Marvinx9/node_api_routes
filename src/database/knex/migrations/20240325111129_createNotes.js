// processo de criar a tabela
exports.up = knex => knex.schema.createTable("notes", table => {
    // criando campos na minha tabela
    table.increments("id");
    table.text("title");
    table.text("description");
    // criando um campo do tipo inteiro, que faz uma referencia ao id que tem dentro da tabela do usuário. 
    table.integer("user_id").references("id").inTable("users");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

// processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("notes");
