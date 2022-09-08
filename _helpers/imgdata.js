const multer = require('multer')
const multer = require('multer')

const multer = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'../public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,'images'+Date.now()+'.'+filetype)
    }
})

