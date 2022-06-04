import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Remove passcode from stream table
  await knex.schema.alterTable('stream', (table) => {
    table.dropColumn('passcode');
  });

  await knex.schema.createTable('passcode', (table) => {
    table.string('passcode', 16).notNullable();
    table.dateTime('active_until').notNullable();
    table.integer('stream_id', 10).unsigned().notNullable();
    table.foreign('stream_id').references('id').inTable('stream');
    table.timestamps(true, true);
  });
}

export async function down(): Promise<void> {
  // Not implemented
}
