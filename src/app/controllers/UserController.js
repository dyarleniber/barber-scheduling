const Joi = require('joi')

const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    const { error } = Joi.validate(req.body, {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })

    if (error) {
      error.details.forEach(element => {
        req.flash('error', element.message)
      })

      return res.redirect('/signup')
    }

    const { name, email, password, provider } = req.body
    const { filename: avatar } = req.file

    const user = await User.findOne({ where: { email } })

    if (user) {
      req.flash('error', 'User already exists')
      return res.redirect('/signup')
    }

    await User.create({
      name,
      email,
      password,
      provider,
      avatar
    })

    return res.redirect('/')
  }
}

module.exports = new UserController()
