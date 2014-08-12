var redis = require('redis');
var logger  = require('mm-node-logger')(module);

var redisClient = redis.createClient(6379);

redisClient.on('error', function (err) {
//    logger.error('*************************************' + ' REDIS DATABASE ' + '********************************************');
//    logger.error('* ');
    logger.error('* ' + err);
//    logger.error('* ');
//    logger.error('**************************************************************************************************');
});

redisClient.on('connect', function () {
    logger.info('**************************************' + ' REDIS DATABASE '.yellow + '********************************************');
    logger.info('* ');
    logger.info('* ' + 'Redis connected to '.green + '6379'.red);
    logger.info('* ');
    logger.info('**************************************************************************************************');
});

exports.redis = redis;
exports.redisClient = redisClient;
