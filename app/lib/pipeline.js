'use strict';

var morgan = require('morgan');
var bodyParser = require('body-parser');
var home = require('../controllers/home');

module.exports =function(app, express){
    app.use(morgan('dev'));
    app.use(express.static(__dirname + '/../static'));
    app.use(bodyParser.urlencoded({extended:true}));

          app.get('/', home.index);

console.log('Pipeline Configured');
};
