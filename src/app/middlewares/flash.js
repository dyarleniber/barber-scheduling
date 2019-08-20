const flashHelper = require('../helpers/flash')

module.exports = (req, res, next) => {
  flashHelper.updateLocalMessages(req, res)

  return next()
}
