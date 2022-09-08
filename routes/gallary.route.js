const express = require('express')
const router = express.Router()

const multer = require('multer')


const storage = multer.diskStorage({
   destination:(req,file,cb)=>{
      cb(null,'./public/images/')
   },
   filename:(req,file,cb)=>{
      cb(null,file.originalname)
   }
})


const filterFile = (req,file,cb)=>{
   if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'|| file.mimetype === 'image/gif' || file.mimetype === 'image/png'){
      cb(null,true)
   }else{
     cb(null,false)
   }
 }


 const upload = multer({dest:'/upload',storage:storage,filterFile:filterFile})


router.post('/upload',upload.single('file'),(req,res)=>{
    if(req.file){
       const pathFile = req.file.path
       res.status(200).send(pathFile)

      //  Gallary.create(req.body,(err,gallary)=>{
      //    if(err){
      //       console.log(err)
      //       return next(err)
      //    }
      //    res.json(gallary)
      //  })
    }else{
      res.status('file not match path extention')
      console.log('file not match path extention')
    }
    
})


module.exports = router