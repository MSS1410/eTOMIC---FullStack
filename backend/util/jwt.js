const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, {
    expiresIn: '1y'
  })
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = { generateToken, verifyToken }
