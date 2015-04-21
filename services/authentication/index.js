'use strict';

var nsq = require('nsqjs');

var reader = new nsq.Reader('sample_topic', 'test_channel', {
    lookupdHTTPAddresses: '192.168.33.13:4161'
});

reader.connect();

reader.on('message', function (msg) {
    console.log('Received message [%s]: %s', msg.id, msg.body.toString());
    msg.finish();
});

reader.on('error', function (err) {
    console.log('Received message [%s]:' + err);
});


