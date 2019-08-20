const Joi = require('joi')

const { User } = require('../models')

const flashHelper = require('../helpers/flash')

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
        flashHelper.errorMessage(req, res, element.message)
      })

      return res.redirect('/')
    }

    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      flashHelper.errorMessage(req, res, 'User not found')
      return res.redirect('/')
    }

    if (!await user.checkPassword(password)) {
      flashHelper.errorMessage(req, res, 'Incorrect password')
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
