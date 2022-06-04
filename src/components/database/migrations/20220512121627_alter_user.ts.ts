import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', (table) => {
    table.unique(['telegram_chat_id']);
  });
}

export async function down(): Promise<void> {
  // Not implemented
}
