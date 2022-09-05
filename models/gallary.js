const mongoose = require('mongoose')

const gallarySchema = new mongoose.Schema({
    id:number,
    imgUrl:String,
    imgTitle:String,
    imgDesc:String,
    uploded:{type:Date,default:Date.now()}

})

const Gallary = new mongoose.model('gallary',gallarySchema)
module.exports = Gallary;