import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('player', (table) => {
    table.increments('id').primary();
    table.string('name', 255);
    table.string('role', 255);
    table.foreign('team_id').references('id').inTable('team');
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  // Not implemented
}
