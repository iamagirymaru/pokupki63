const knex = require('../db/knex.js')

module.exports.getAll = function(req, res) {
  knex('products')
  .select()
  .then((products) => {res.status(200).json(products)})
  .catch(() => res.status(404).json({message: "Ошибка загрузки продукции."}))
}

module.exports.create = async function(req, res) {
  if (req.user.status == 'Администратор') {
    //проверка названия товара в базе
    const candidate = await knex('products').where('name', req.body.name)
    if (candidate[0]) {
      res.status(409).json({message: "Товар с таким названием уже существует"})
    } else {
      knex('products')
        .insert({
          name: req.body.name,
          count: req.body.count,
          price: req.body.price,
          imageName: req.file ? req.file.filename : '' 
        })
        .then((id) => res.status(201).json({message: `Товар успешно создан, ID: ${id}`}))
        .catch(() => res.status(500).json({message: "Ошибка создания товара."}))
      }
  } else {
   res.status(401).json({message: "Необходимы права администратора."})
  }
}

module.exports.update = async function(req, res) {
  const products = req.body.products
  try {
    await products.forEach(function(product) {
      knex('products')
        .where('name', product.name)
        .select('count')
        .then((productC) => {
          knex('products')
            .where('name', product.name)
            .update({ 
              count: productC[0].count - product.quantity
            })
            .then()
            .catch()
        })
    })
  } catch(e) {
    res.status(200).json(e)
  }
}