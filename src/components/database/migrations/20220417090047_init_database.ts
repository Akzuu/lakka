import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('league', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('description', 512);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('stream', (table) => {
    table.increments('id').primary();
    table.string('passcode', 32).notNullable().unique();
    table.integer('league_id', 10).unsigned();
    table.foreign('league_id').references('id').inTable('league');
    table.dateTime('start_time');
    table.dateTime('end_time');
    table.string('location', 255);
    table.boolean('ended');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('user', (table) => {
    table.string('telegram_id', 255).notNullable();
    table.string('name', 255).notNullable();
    table.string('description', 512);
    table.enum('role', ['host', 'co-host', 'technician']).notNullable();
    table.integer('stream_id', 10).unsigned();
    table.foreign('stream_id').references('id').inTable('stream');
    table.primary(['stream_id', 'telegram_id']);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('team', (table) => {
    table.increments('id').primary();
    table.string('name', 255);
    table.string('abbreviation', 255);
    table.string('description', 512);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('player', (table) => {
    table.increments('id').primary();
    table.string('name', 255);
    table.string('role', 255);
    table.integer('team_id', 10).unsigned();
    table.foreign('team_id').references('id').inTable('team');
    table.timestamps(true, true);
  });
}

export async function down(): Promise<void> {
  // Not implemented
}
