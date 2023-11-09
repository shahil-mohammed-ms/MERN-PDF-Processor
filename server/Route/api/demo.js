const express = require('express');
const router = express.Router();
const demoModule = require('../../Modules/Demo/demoController')

router.get('/',demoModule.demoChecking)


module.exports = router;