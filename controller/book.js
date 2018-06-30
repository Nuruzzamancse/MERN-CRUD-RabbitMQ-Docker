var mongoose = require('mongoose');
var Book = require('../models/Book');


var getBook = (req, res, next) => {
    console.log('In get book');

      Book.find(function (err, products) {
    	if (err) return next(err);
    	res.json(products);var mongoose = require('mongoose');

  		});


};

var  createBook  = (req, res, next) =>{
    Book.create(req.body, function (err, post) {
        if (err) return next(err);

        console.log('In create book');

        ////////////////////////////////////////

        var amqp = require('amqplib/callback_api');

        amqp.connect('amqp://esceozyd:Xzva5w9d5CssOWFqyOLx9GHI-j3Aw81B@emu.rmq.cloudamqp.com/esceozyd', function(err, conn) {
            conn.createChannel(function(err, ch) {
                var q = 'rpc_queue';

                ch.assertQueue(q, {durable: false});
                ch.prefetch(1);
                console.log(' [x] Awaiting RPC requests');

                ch.consume(q, function reply(msg) {

                    var r = message();

                    ch.sendToQueue(msg.properties.replyTo,
                        new Buffer(r.toString()),
                        {correlationId: msg.properties.correlationId});

                    console.log("You message has delivered.");

                    ch.ack(msg);
                });
            });
        });

        function message(n) {
            return "New book added, You may like.";
        }


        ///////////////////////////////

        // res.json(post);


    });
}

var updateBook = (req, res, next) =>{
     Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    	if (err) return next(err);
    	res.json(post);
  		});
}

var getBookId = (req, res, next) =>{
    Book.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
}

var deleteBook = (req, res, next) =>{
    Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
}


module.exports = {
    createBook,
    getBook,
    updateBook,
    getBookId,
    deleteBook
}

