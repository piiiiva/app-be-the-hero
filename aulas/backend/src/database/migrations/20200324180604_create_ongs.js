
exports.up = function(knex) { // método up responsável pela criaçao da tabela
  return knex.schema.createTable('ongs', function (table){ // criando minha tabela
      table.string('id').primary();
      table.string('name').notNullable(); // nao vai poder ser vazio/nulo
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable(); // 2 pq sabemos que uf tem 2 caracteres só
  })
};

exports.down = function(knex) { // Método down responsável para se der merda - o que preciso fazer - geralmente desfaz o que foi feito no método up
    return knex.schema.dropTable('ongs'); // desfaz a tabela ongs
};
