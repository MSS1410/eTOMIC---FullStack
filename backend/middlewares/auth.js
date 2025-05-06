const { attendedEvent } = require('../controllers/user')
const User = require('../modelos/user')
const { verifyToken } = require('../util/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const parsedToken = token.replace('Bearer ', '')
    const decoded = verifyToken(parsedToken)
    console.log('token decoded', decoded)

    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      attendedEvents: user.attendedEvents
    }
    console.log('user OK auth', req.user)
    next()
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Unauthorized', error: error.message })
  }
}

module.exports = { isAuth }
