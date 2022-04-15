import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('stream', (table) => {
    table.increments('id').primary();
    table.string('passcode', 32).notNullable();
    table.foreign('league').references('id').inTable('league');
    table.dateTime('start_time');
    table.dateTime('end_time');
    table.string('location', 255);
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  // Not implemented
}
