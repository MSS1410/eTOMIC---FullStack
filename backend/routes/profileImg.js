const { isAdmin } = require('../middlewares/admin')

const routerProfileImg = require('express').Router()
const { isAuth } = require('../middlewares/auth')
const { upload } = require('../config/cloudinary')
const { updateProfileImage } = require('../controllers/user')

routerProfileImg.put(
  '/profile-image',
  isAuth,
  upload.single('img'),
  updateProfileImage
)

module.exports = routerProfileImg
