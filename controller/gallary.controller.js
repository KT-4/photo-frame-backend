




// const uploadFile = (req,res,next) =>{
//     if(!req.file){
//         return res.status(500).send({message:'Upload fail'});
//     }else{
//         req.body.imgUrl = `process.env.imageurl${req.file.filetype}`
        
//         Gallary.create(req.body,(err,gallary)=>{
//             if(err){
//                 console.log(err)
//                 return next(err)
//             }
//             res.json(gallary)
//         })
//     }
// }


// module.exports = storege;