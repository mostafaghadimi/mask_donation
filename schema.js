var mongoose = require('mongoose')


var Schema = mongoose.Schema;

var NationalCodeSchema = new Schema({
    nationalCode: String,
    creationDate: String
})

var NationalCodeModel = mongoose.model('nationalCode', NationalCodeSchema)

exports.model = NationalCodeModel