const express = require('express')
const passport = require('passport')
const controller = require('../controllers/product')
const upload = require('../middleware/upload')
const router = express.Router()


router.get('/', controller.getAll)

router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create)

router.patch('/', controller.update)

module.exports = router