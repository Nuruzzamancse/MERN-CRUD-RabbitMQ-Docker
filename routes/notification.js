var express = require('express');
var router = express.Router();
const notificationContoller = require('../controller/notification');



router.get('/', notificationContoller.getBook);


module.exports = router;
