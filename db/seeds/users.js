exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, login: 'yan', password: '4444', status: 'Администратор'}
      ]);
    });
};