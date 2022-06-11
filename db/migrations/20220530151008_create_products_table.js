exports.up = function(knex) {
  return knex.schema
    .createTable('products', function (table) {
      table.increments('id')
      table.string('name')
      table.mediumint('price')
      table.tinyint('count')
      table.string('imageName')
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('products');
};