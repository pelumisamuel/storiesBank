const ensureAuth = (req, res, next) => {
  //console.log(req)
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/')
  }
  // next()
}
const ensureGuest = (req, res, next) => {
  //console.log(req)
  if (req.isAuthenticated()) {
    res.redirect('/dashboard')
  } else {
    return next()
  }
  //next()
}

// export function ensureAuth(req, res, next) {
//   console.log(req.isAuthenticated())
//   if (req.isAuthenticated()) {
//     return next()
//   } else {
//     res.redirect('/')
//     // next()
//     // return res.render('login', {
//     //   layout: 'login',
//     // })
//   }
//   //   next()
//   //   res.render('login')
// }
// export function ensureGuest(req, res, next) {
//   console.log(req.isAuthenticated())
//   if (req.isAuthenticated()) {
//     //res.render('dashboard')
//     res.redirect('/dashboard')
//   } else {
//     return next()
//   }
// }
export { ensureAuth, ensureGuest }
