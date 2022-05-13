import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', (table) => {
    table.dropForeign('stream_id');
    table.dropPrimary();

    table.dropColumn('stream_id');
    table.dropColumn('role');
  });

  await knex.schema.alterTable('user', (table) => {
    table.increments('id');

    table.primary(['id']);
  });

  await knex.schema.createTable('stream_users', (table) => {
    table.increments('id');
    table.integer('stream_id', 10).unsigned().notNullable();
    table.integer('user_id', 10).unsigned().notNullable();
    table.enum('role', ['host', 'co-host', 'technician']).notNullable();

    table.foreign('stream_id').references('id').inTable('stream');
    table.foreign('user_id').references('id').inTable('user');
    table.unique(['stream_id', 'user_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  // Not implemented
}
