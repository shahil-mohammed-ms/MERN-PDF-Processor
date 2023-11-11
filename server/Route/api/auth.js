const express = require('express');
const router = express.Router();
const authModule = require('../../Modules/auth/authController')

//for signin
router.post('/signin',authModule.Signin)

// for login
router.post('/login',authModule.Login)

module.exports = router;