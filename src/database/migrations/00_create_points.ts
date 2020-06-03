import Knex from 'knex';
// arquivo de criação da tabela points do banco de dados
// knex é um pacote que nos permite escrever nossas querys em javascript para os bancos de dados e criar as tabelas por meio de migrations

export async function up(knex: Knex) {
    //Criar a (ou da) tabela
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
}

export async function down(knex: Knex) {
    //Deletar a (ou da) tabela
    return knex.schema.dropTable('points');
}
