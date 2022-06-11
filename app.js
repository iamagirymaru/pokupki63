const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser') 
const authRoutes = require('./routes/auth')
const orderRoutes = require('./routes/order')
const productRoutes = require('./routes/product')
const path = require('path')
const app = express()

require("dotenv").config()

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.static(path.resolve(__dirname, 'client/dist')))

app.use('/api/auth', authRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/product', productRoutes)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/dist', 'index.html'))
})

module.exports = app