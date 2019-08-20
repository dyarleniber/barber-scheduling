const bcrypt = require('bcryptjs')
const fileHelper = require('../helpers/file')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      avatar_path: DataTypes.VIRTUAL,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        },
        afterFind: async result => {
          if (result) {
            if (result.constructor === Array) {
              result = result.map(async item => {
                await fileHelper.uploadFileExists(item.avatar)
                  .then(function (res) {
                    item.avatar_path = `/files/${item.avatar}`
                  })
                  .catch(function (e) {
                    item.avatar_path = '/images/avatar.svg'
                  })

                return item
              })
            } else {
              await fileHelper.uploadFileExists(result.avatar)
                .then(function (res) {
                  result.avatar_path = `/files/${result.avatar}`
                })
                .catch(function (e) {
                  result.avatar_path = '/images/avatar.svg'
                })
            }
          }

          return result
        }
      }
    }
  )

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  return User
}
