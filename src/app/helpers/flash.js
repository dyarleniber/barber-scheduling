const stringHelper = require('./string')

const flashMessage = (req, index, message) => {
  console.log(message)
  req.flash(index, stringHelper.removeQuotes(message))
}

const successMessage = (req, res, message) => {
  flashMessage(req, 'success', message)
}

const errorMessage = (req, res, message) => {
  flashMessage(req, 'error', message)
}

const updateLocalMessages = (req, res) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')
}

module.exports = {
  successMessage,
  errorMessage,
  updateLocalMessages
}
