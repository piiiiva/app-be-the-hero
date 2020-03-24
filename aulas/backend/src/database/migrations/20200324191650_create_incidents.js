exports.up = function(knex) { // método up responsável pela criaçao da tabela
    return knex.schema.createTable('incidents', function (table){ // criando minha tabela
        table.increments(); // cria um id numerico, cria uma chave primaria autoincrement 1, 2, 3, 4 ...
        
        table.string('titulo').notNullable(); // nao vai poder ser vazio/nulo
        table.string('description').notNullable();
        table.decimal('value').notNullable(); // formato decimal float (pode receber casas decimais)
        
        table.string('ong_id').notNullable(); // relacionamento - coluna para armazenar qual ong criou o incident

        table.foreign('ong_id').references('id').inTable('ongs');  // cria a chave estrangeira - cada vez que esse ong_id estiver preenchido ele precisa ser um id cadastrado dentro da tabela ongs

    })
  };
  
  exports.down = function(knex) { // Método down responsável para se der merda - o que preciso fazer - geralmente desfaz o que foi feito no método up
      return knex.schema.dropTable('incidents'); // desfaz a tabela ongs
  };