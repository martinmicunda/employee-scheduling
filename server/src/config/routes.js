// RESTful API Handlers
var handlers = {
    index: require('../controllers/index')
};

module.exports = function (app) {

    // Index RESTful
    app.get('/', handlers.index.index);
};