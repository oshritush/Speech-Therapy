var express = require('express');
var app = express();
var router = express.Router();

var mongoose = require('mongoose'); //get DB
//var connection=mongoose.createConnection('mogodb'://Gitelki:025385507@ds032319.mlab.com:32319/jce16')
var connection = mongoose.createConnection('mongodb://oshrit:12345@ds025459.mlab.com:25459/speach-theropy');//connect to the db server
var pasiontSchema = require('../models/pasiont');
var pasiont = connection.model('pasiont', pasiontSchema);


//var request = require('request');

// routes
router.post('/register', function (req, res) {
    
});

module.exports = router;

