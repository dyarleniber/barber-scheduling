const Joi = require('joi')

const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { error } = Joi.validate(req.body, {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })

    if (error) {
      error.details.forEach(element => {
        req.flash('error', element.message)
      })

      return res.redirect('/')
    }

    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      req.flash('error', 'User not found')
      return res.redirect('/')
    }

    if (!await user.checkPassword(password)) {
      req.flash('error', 'Incorrect password')
      return res.redirect('/')
    }

    req.session.user = user

    return res.redirect('/app/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie(process.env.SESSION_NAME)
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()
