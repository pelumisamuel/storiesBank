import express from 'express'
import { ensureAuth, ensureGuest } from '../middlewares/auth.js'
import Story from '../models/Story.js'

const router = express.Router()

// loggin landing page
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

// dashboard

router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean()
    //console.log(req.user)
    res.render('dashboard', {
      name: req.user.firstName,
      stories,
    })
  } catch (error) {
    res.render('/error/500')
  }
})

export default router
