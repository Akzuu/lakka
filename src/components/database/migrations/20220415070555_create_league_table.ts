import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('league', (table) => {
    table.increments('id').primary();
    table.string('name', 255);
    table.string('description', 512);
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  // Not implemented
}
