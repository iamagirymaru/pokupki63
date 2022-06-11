const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const knex = require('../db/knex.js')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY
}

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await knex('users').select('id', 'login', 'status').where('id', payload.userId)
        if (user[0]) {
          done(null, user[0])
        } else {
          done(null, false)
        }
      } catch(e) {
        console.log(e)
      }
    })
  ) 
} 