exports.up = function(knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id')
      table.string('login').unique().notNullable();
      table.string('password').notNullable();
      table.string('status').defaultTo('Покупатель');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('users');
};