import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.string('telegram_id', 255).notNullable();
    table.string('name', 255).notNullable();
    table.string('description', 512);
    table.enum('role', ['host', 'co-host', 'technician']).notNullable();
    table.foreign('stream_id').references('id').inTable('stream');
    table.primary(['stream_id', 'telegram_id']);
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  // Not implemented
}
