import strategy, { Strategy } from 'passport-google-oauth20'
import mongoose from 'mongoose'
import User from '../models/User.js'

const GoogleStrategy = Strategy

export default async (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        scope: ['profile'],
      },
      async (accessToken, refreshToken, profile, cb) => {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user)
        // })
        console.log(accessToken)
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        }
        try {
          let user = await User.findOne({ googleId: profile.id })
          if (user) {
            cb(null, user)
          } else {
            user = await User.create(newUser)
            cb(null, user)
          }
        } catch (error) {
          console.error(error)
        }
      }
    )
  )
  passport.serializeUser((user, cb) =>
    process.nextTick(() => {
      return cb(null, {
        id: user.id,
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
      })
    })
  )

  passport.deserializeUser((user, cb) => process.nextTick(() => cb(null, user)))
}
