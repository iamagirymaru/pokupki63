const knex = require('../db/knex.js')
const jwt = require('jsonwebtoken')

module.exports.login = async function(req, res) {
  //поиск пользователя с данным login
  const candidate = await knex('users').where('login', req.body.login) 

  if (candidate[0]) {
    //проверка пароля
    const login = req.body.login
    const password = req.body.password

    knex('users')
      .select({ 
        id: 'id',
        login: 'login',
        password: 'password',
        status: 'status'
      })
      .where('login', login)
      .then((user) => {
        if (user[0].password === password) {
          //генерация токена
          const token = jwt.sign({
            userId: user[0].id,
            login: user[0].login,
            status: user[0].status
          }, process.env.JWT_KEY, {expiresIn: 3600*48})

          res.status(200).json({
            token: token,
            message: "Вход выполнен успешно."
          })

        } else {
          res.status(404).json({message: "Пароль введен неверно."})
        }
      })
      .catch(() => res.status(500).json({message: "Ошибка авторизации."}))
  } else {
    res.status(404).json({message: "Пользователь с таким login не был найден."})
  }
}

module.exports.register = async function(req, res) {

  //поиск пользователя с таким же login
  const candidate = await knex('users').where('login', req.body.login) 

  if (candidate[0]) {
    res.status(409).json({message: "Пользователь с таким login уже существует."})
  } else {

    //создание пользователя
    const login = req.body.login
    const password = req.body.password

    knex('users')
      .insert({
        login: login,
        password: password
      })
      .then(res.status(201).json({message: "Пользователь успешно создан."}))
      .catch(() => res.status(500).json({message: "Ошибка создания пользователя."}))
  }
}

module.exports.update = async function(req, res) {
  let changeVal = ''
  if (req.user.status === 'Администратор') {
    changeVal = 'Покупатель'
  } else {
    changeVal = 'Администратор'
  }
  await knex('users')
    .where('id', req.user.id)
    .update({status: changeVal})
    .then()
    .catch(() => res.status(500).json({message: "Ошибка изменения статуса."}))

  await knex('users')
  .where('id', req.user.id)
  .then((user) => {
    const token = jwt.sign({
      userId: user[0].id,
      login: user[0].login,
      status: user[0].status
    }, process.env.JWT_KEY, {expiresIn: 3600})
    res.status(200).json({token: token})
  })
  .catch()
}