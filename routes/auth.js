import express from 'express'
import passport from 'passport'
const router = express.Router()

// google authenticate
router.get('/google', passport.authenticate('google'))

// dashboard

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    //console.log(req)
    res.redirect('/dashboard')
  }
)

export default router
