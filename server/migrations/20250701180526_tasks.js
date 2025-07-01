/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('tasks', tbl => {
    tbl.increments('id').primary();
    tbl.string('title', 256).notNullable();
    tbl.text('description');
    tbl.string('status').defaultTo('pending');
    tbl.string('priority').defaultTo('medium');
    tbl.string('assignee');
    tbl.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('tasks');
};
