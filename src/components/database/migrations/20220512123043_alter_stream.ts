import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('stream', (table) => {
    table.setNullable('league_id');
  });
}

export async function down(): Promise<void> {
  // Not implemented
}
