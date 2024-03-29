const moment = require('moment')
const multer = require('multer')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'client/dist/images/')
  },
  filename(req, file, cb) {
    const date = moment().format('DDMMYYYY-HHmmss-SSS')
    cb(null, `${date}${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const limits = {
  fileSize: 1024*1024*4
}

module.exports = multer({
  storage,
  fileFilter,
  limits
})