const express = require('express');
const router = express.Router();

//All route of demo
const demoRoute = require('./api/demo')
router.use('/demo',demoRoute)

//All route of pdf 
const pdfRoute = require('./api/pdf')
router.use('/pdf',pdfRoute)


module.exports = router;