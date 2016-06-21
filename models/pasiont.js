var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pasiontSchema = new Schema({
    id:Number,
    firstName: String,
	lastName: String,
    phone: Number,	
	Email: String   
});

module.exports = pasiontSchema;