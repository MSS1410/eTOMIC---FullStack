const isAdmin = (req, res, next) => {
  console.log('verificar Admin', req.user)
  if (req.user && req.user.role === 'admin') {
    console.log('User is admin, OK')
    return next()
  }
  return res.status(403).json({ message: 'only admin' })
}

module.exports = { isAdmin }
