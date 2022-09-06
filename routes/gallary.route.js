const express = require('express')
const multer = require('multer')
const gallary = require('../models/gallary')
const mongoose = require('mongoose')
const router = express.Router()

const path = require('../public/')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path)
    },
    filename:(req,file,cb)=>{
        const fileName  = file.originalname.toLocaleLowerCase().split(' ').join('-')
        cb(null,fileName)
    }
})

// Multer Mime type valiation

let upload = multer({storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:(req,file,cb)=>{
        if(
         file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'     
        ){
           cb(null,true)
        }else{
            cb(null,false)
               return cb(new Error('Only .png .jpg and .jpeg format allowed!'))
        }
    }
 })

 //post Data gallary

 router.post('./create-user',upload.single('avtar'),(req,file,next)=>{
    const url = req.protocol +'://'+req.get('host')

    const user = new User({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        avtar:url + '/public'+ req.file.filename
    })
    user.save().then((res)=>{
         res.status(201).json({message:'user registered successfully!',
         userCreated:{
            _id:resizeBy._id,
            name:res.name,
            avtar:res.avtar,
         }
        })
    }).catch((err)=>{
        console.log(err),
        res.status(500).json({error:err})
    })

 })

 router.get('/',(req,res,next)=>{
    User.find().then((data)=>{
         res.status(200).json({message:'user retrived successfully!',
         users:data
      })
    })
 })

 router.get('/:id',(req,res,next)=>{
    User.findById(req.params.id).then((data)=>{
        if(data){
            res.status(200).json(post)
        }else{
            res.status(404).json({
                message:'User not found !'
            })
        }
    })
 })
 
 module.exports = router