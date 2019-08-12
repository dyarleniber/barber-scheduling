module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user // Available in Nunjucks views

    return next()
  }

  return res.redirect('/')
}
