exports.up = function(knex) {
  return knex.schema
    .createTable('orders', function (table) {
      table.increments('id')
      table.string('userLogin')
      table.jsonb('products')
      table.string('orderStatus')
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('orders');
};