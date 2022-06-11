const knex = require('../db/knex.js')

module.exports.getAll = function(req, res) {
  if (req.user.status == 'Администратор') {
    knex('orders')
    .select()
    .then((orders) => res.status(200).json(orders))
    .catch((e) => res.status(500).json({message: "Ошибка загрузки заказов.", e}))
  } else {
    res.status(401).json({message: "Необходимы права администратора."})
  }
}

module.exports.getByUserLogin = function(req, res) {
  knex('orders')
    .select()
    .where('userLogin', req.user.login)
    .then((orders) => res.status(200).json(orders))
    .catch((e) => res.status(500).json({message: "Ошибка загрузки заказов.", e}))
}

module.exports.create = function(req, res) {

  knex('orders')
    .insert({
      userLogin: req.user.login,
      products: JSON.stringify(req.body.products),
      orderStatus: 'Оплачен'
    })
    .then((id) => res.status(201).json({message: `Заказ № ${id} успешно создан.`}))
    .catch((e) => res.status(500).json({message: 'Ошибка создани заказа'}, e))
}

module.exports.update = function(req, res) {
  if (req.user.status == 'Администратор') {
    knex('orders')
    .where('id', req.body.id)
    .update({orderStatus: 'Выдан'})
    .then(res.status(200).json({message: 'Выдан'}))
    .catch(() => res.status(500).json({message: "Ошибка выдачи заказа."}))
  } else {
    res.status(401).json({message: "Необходимы права администратора."})
  }
}