const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    let token=req.headers['token'];
    jwt.verify(token,'123-ABC-XYZ',function (err,decodedData) {
        if (err){
            res.status(401).json({status:"unauthorized"})
        }
        else{
            let email=decodedData['data']
            req.headers.email=email;
            next();
        }
    })
}