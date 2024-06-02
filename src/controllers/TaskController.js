const TaskModel = require("../models/TaskModel")

exports.CreateTask = async(req,res)=>{
    try {
      let reqBody = req.body
      reqBody.email = req.headers['email']
      const data = await TaskModel.create(reqBody)
      return res.status(200).json({message:"success",data:data})
      
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
  }

exports.UpdateTaskByStatus = async(req,res)=>{
    try {
      let id = req.params.id
      let status = req.params.status
      let query = {_id:id}
      let reqBody = {status:status}
      
      const data = await TaskModel.updateOne(query,reqBody)
      return res.status(200).json({message:"success",data:data})
      
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
  }
exports.TaskDelete = async(req,res)=>{
    try {
      let id = req.params.id
      let query = {_id:id}
      const data = await TaskModel.deleteMany(query)
      return res.status(200).json({message:"success",data:data})
      
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
  }

exports.ListTaskByStatus = async(req,res)=>{
    try {
      let status = req.params.status
      let email = req.headers['email']
      const data = await TaskModel.aggregate([
        {$match:{status:status,email:email}},
        {$project:{
            _id:1,title:1,description:1,status:1,
            yearMonthDayUTC:{ $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
        }}
      ])
      return res.status(200).json({message:"success",data:data})
      
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
  }

exports.ListTaskCount = async(req,res)=>{
    try {
      let email = req.headers['email']
      const data = await TaskModel.aggregate([
        {$match:{email:email}},
        {$group:{_id:"$status",sum:{$count: {}}}}
      ])
      return res.status(200).json({message:"success",data:data})
      
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
  }








