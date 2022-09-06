const mongoose = require('mongoose')

const gallarySchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
     name:{
        type:String
      },
      avatar:{
        type:String
      },
    },
    {
        collation:'users'
    })

const Gallary = new mongoose.model('gallary',gallarySchema)
module.exports = Gallary;