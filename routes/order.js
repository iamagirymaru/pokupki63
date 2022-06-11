const express = require('express')
const controller = require('../controllers/order')
const passport = require('passport')
const router = express.Router()

router.post('/', passport.authenticate('jwt', {session: false}), controller.create)

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)

router.get('/my_orders', passport.authenticate('jwt', {session: false}), controller.getByUserLogin)

router.patch('/', passport.authenticate('jwt', {session: false}), controller.update)

module.exports = router