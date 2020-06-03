import Knex from 'knex';
// arquivo de criação da tabela points do banco de dados
// knex é um pacote que nos permite escrever nossas querys em javascript para os bancos de dados e criar as tabelas por meio de migrations

export async function up(knex: Knex) {
    //Criar a (ou da) tabela
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary(); //increments = integer por padrão
        
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points'); //cria uma chave estrangeira para points
        
        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items'); //cria uma chave estrangeira para items
    });
}

export async function down(knex: Knex) {
    //Deletar a (ou da) tabela
    return knex.schema.dropTable('point_items');
}
