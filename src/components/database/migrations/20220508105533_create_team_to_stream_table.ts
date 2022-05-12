import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('stream_teams', (table) => {
    table.increments('id');
    table.integer('stream_id', 10).unsigned().notNullable();
    table.integer('team_id', 10).unsigned().notNullable();
    table.smallint('game_number').unsigned().notNullable().defaultTo(1);

    table.foreign('stream_id').references('id').inTable('stream');
    table.foreign('team_id').references('id').inTable('team');
    table.unique(['stream_id', 'team_id', 'game_number']);
  });
}

export async function down(knex: Knex): Promise<void> {
  // Not implemented
}
