exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {name: 'Кроссовки Adidas', price: 2500, count: 20, imageName: '1.jpeg'},
        {name: 'Кроссовки Reebok', price: 2600, count: 20, imageName: '2.jpeg'},
        {name: 'Кроссовки Puma', price: 3700, count: 20, imageName: '3.jpeg'},
        {name: 'Кроссовки Adidas-1', price: 3500, count: 20, imageName: '4.jpeg'},
        {name: 'Кроссовки Reebok-1', price: 4600, count: 20, imageName: '5.jpeg'},
        {name: 'Кроссовки Puma-1', price: 5700, count: 20, imageName: '6.jpeg'}
      ]);
    });
};