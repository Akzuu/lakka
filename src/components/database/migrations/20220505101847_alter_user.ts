import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', (table) => {
    table.dropForeign('stream_id');
    table.dropPrimary();

    table.dropColumn('stream_id');
  });

  await knex.schema.alterTable('user', (table) => {
    table.integer('stream_id', 10).unsigned().notNullable();
    table.foreign('stream_id').references('id').inTable('stream');

    table.renameColumn('telegram_id', 'telegram_chat_id');

    table.primary(['stream_id', 'telegram_chat_id']);

    table.setNullable('name');
  });
}

export async function down(): Promise<void> {
  // Not implemented
}
