const multer = require('multer')
const Gallary = require('../models/gallary')
 
const storege = multer.diskStorege({
    destination:(req,file,cb)=>{
        console.log(file)

        const filetype = '';
        if(file.mimetype === 'image/gif'){
            filetype = 'gif';
        }
        if(file.mimetype === 'image/png'){
            filetype = 'png';
        }
        if(file.mimetype === 'image/jpeg'){
            filetype = 'jpg'
        }
        cb(null,'image-'+Date.now()+'.'+filetype);
    } 
});

module.exports = storege;