const { Op } = require('sequelize')
const moment = require('moment')

const { Appointment, User } = require('../models')

class DashboardController {
  async index (req, res) {
    if (req.session.user.provider) {
      const appointments = await Appointment.findAll({
        include: [{ model: User, as: 'user' }],
        where: {
          provider_id: req.session.user.id,
          date: {
            [Op.between]: [
              moment()
                .startOf('day')
                .format(),
              moment()
                .endOf('day')
                .format()
            ]
          }
        }
      })

      return res.render('dashboard/provider/index', { appointments })
    }

    const providers = await User.findAll({ where: { provider: true } })

    return res.render('dashboard/index', { providers })
  }
}

module.exports = new DashboardController()
