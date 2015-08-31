var controllers = require('./controllers');

var express = require('express');

var router = express.Router();

router.get('/statistic', controllers.visitorsApi.getStatisticsByCriteria);

module.exports = router;