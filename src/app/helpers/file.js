const path = require('path')
const fs = require('fs')

const uploadFileExists = file => {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      file
    )

    fs.access(filePath, fs.F_OK, (err) => {
      if (err) {
        return reject(err)
      }

      resolve()
    })
  })
}

module.exports = {
  uploadFileExists
}
