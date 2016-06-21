var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    id: Number,
    startedTreatment: Date,
	TreatmentSeriesnumber: Number,
	ActualTreatments: Number,
	background:  String,
	TherapeuticProgram: String,
	ProgressAndcourseoftreatment: String,
	//Recommendations:String,
    
});

module.exports = orderSchema;