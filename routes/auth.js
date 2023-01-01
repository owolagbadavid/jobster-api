const express = require('express')
const testUser = require('../middleware/testUser');
const rateLimiter = require('express-rate-limit');

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: "Too many atempts from this IP, please try again in 15 minutes"
  }
})


const router = express.Router()
const authenticateUser = require('../middleware/authentication');
const { register, login, updateUser } = require('../controllers/auth')
router.post('/register',apiLimiter, register)
router.post('/login', apiLimiter, login)
router.patch('/updateUser', authenticateUser, testUser, updateUser)

module.exports = router
