var mongoose = require('mongoose');
var Book = require('../models/Book');


var getBook = (req, res, next) => {

    var amqp = require('amqplib/callback_api');

    // var args = process.argv.slice(2);
    //
    // if (args.length == 0) {
    //     console.log("Usage: rpc_client.js num");
    //     process.exit(1);
    // }

    amqp.connect('amqp://esceozyd:Xzva5w9d5CssOWFqyOLx9GHI-j3Aw81B@emu.rmq.cloudamqp.com/esceozyd', function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.assertQueue('', {exclusive: true}, function(err, q) {
                var corr = generateUuid();
                var message = "book_news";

                console.log(' [x] Requesting for the notification.');

                ch.consume(q.queue, function(msg) {
                    if (msg.properties.correlationId == corr) {
                        console.log(' [.] Got %s', msg.content.toString());
                        res.json(msg.content.toString());
                        setTimeout(function() { conn.close();}, 500);
                    }
                }, {noAck: true});

                ch.sendToQueue('rpc_queue',
                    new Buffer(message),
                    { correlationId: corr, replyTo: q.queue });
            });
        });
    });

    function generateUuid() {
        return Math.random().toString() +
            Math.random().toString() +
            Math.random().toString();
    }


};


module.exports = {
    getBook
}

