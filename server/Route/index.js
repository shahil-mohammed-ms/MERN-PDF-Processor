const express = require('express');
const router = express.Router();

//All route of demo
const demoRoute = require('./api/demo')
router.use('/demo',demoRoute)

//All route of pdf 
const pdfRoute = require('./api/pdf')
router.use('/pdf',pdfRoute)

//All authentication routes

const authRoute = require('./api/auth')
router.use('/auth',authRoute)


module.exports = router;