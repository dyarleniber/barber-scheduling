const { User, Appointment } = require('../models')
const flashHelper = require('../helpers/flash')
const scheduleConfig = require('../../config/schedule')

class AppointmentController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)

    if (!provider) {
      return res.redirect('/app/dashboard')
    }

    return res.render('appointments/create', {
      provider,
      dateFormat: scheduleConfig.dateFormat
    })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })

    flashHelper.successMessage(req, res, 'Schedule successfully created')

    return res.redirect('/app/dashboard')
  }
}

module.exports = new AppointmentController()
