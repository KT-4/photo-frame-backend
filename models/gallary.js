const mongoose = require('mongoose')


const GallarySchema = new mongoose.Schema({
  _id:{
    type:String
  },
  imgTitle:{
     type:String
  },
  imgeurl:{
    type:String
  },
  imgDesk:{
    type:String
  },
  uplode:{
    type:Date,
    Default:Date.now()
  }
})

module.exports = new mongoose.model('Gallary',GallarySchema)