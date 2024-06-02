const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')



exports.registration = async(req,res)=>{
  try {
    let reqBody = req.body
    const data = await UserModel.create(reqBody)
    return res.status(200).json({message:"success",data:data})
    
  } catch (error) {
      return res.status(400).json({message:error.message})
  }
}


exports.login = async(req,res)=>{
  try {
    let reqBody = req.body
    const data = await UserModel.aggregate([
            {$match:reqBody},
            {$project:{_id:0,email:1,firstName:1,lastName:1, mobile:1,photo:1}}
    ])

    if (data.length>0) {
        let Payload = {exp:Math.floor(Date.now()/1000) * (24*60*60),data:data[0]['email']}
        let KEY="123-ABC-XYZ";
        let token = jwt.sign(Payload,KEY)
        return res.status(200).json({message:"success",token:token, data:data[0]})

    } else {
        return res.status(401).json({message:"UnOthorized"})
    }
    
  } catch (error) {
      return res.status(400).json({message:error.message})
  }
}

exports.profileUpdate = async(req,res)=>{
    try {
      let email = req.headers.email
      let reqBody = req.body
      const data = await UserModel.updateOne({email:email},reqBody)
      return res.status(200).json({message:"success",data:data})
      
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
  }