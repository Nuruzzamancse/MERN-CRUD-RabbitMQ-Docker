var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book.js');
var bookController = require('../controller/book');



router.post('/',bookController.createBook);


router.get('/:id', bookController.getBookId);

router.get('/', bookController.getBook);

router.put('/:id', bookController.updateBook);


router.delete('/:id', bookController.deleteBook);

module.exports = router;
