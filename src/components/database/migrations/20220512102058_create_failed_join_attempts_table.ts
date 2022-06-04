import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('failed_join_attempts', (table) => {
    table.increments('id');
    table.integer('user_id', 10).unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('user');

    table.timestamps(true, true);
  });
}

export async function down(): Promise<void> {
  // Not implemented
}
