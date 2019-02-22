'use strict'
var express = require('express');
var router = express.Router();
var reportController = require('../controllers/report');
const { isLoggedIn } = require('../lib/auth');

router.post('/report',reportController.generatePdf);
router.get('/reportView',reportController.getPdfFile);

module.exports = router;