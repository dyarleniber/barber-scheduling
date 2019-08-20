const Joi = require('joi')

const { User } = require('../models')

const flashHelper = require('../helpers/flash')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    const { error } = Joi.validate(req.body, {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      provider: Joi.string()
    })

    if (error) {
      error.details.forEach(element => {
        flashHelper.errorMessage(req, res, element.message)
      })

      return res.redirect('/signup')
    }

    const { name, email, password, provider = false } = req.body
    const { filename: avatar } = req.file || {}

    const user = await User.findOne({ where: { email } })

    if (user) {
      flashHelper.errorMessage(req, res, 'User already exists')
      return res.redirect('/signup')
    }

    await User.create({
      name,
      email,
      password,
      avatar,
      provider: !!provider
    })

    flashHelper.successMessage(req, res, 'Account successfully created')

    return res.redirect('/')
  }
}

module.exports = new UserController()
