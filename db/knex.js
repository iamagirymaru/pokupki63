const path = require('path')
require('dotenv').config({path:path.join(__dirname,'../.env')})
const environment = process.env.ENVIRONMENT
const config = require('./knexfile.js')[environment];
module.exports = require('knex')(config);