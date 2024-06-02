const mongoose = require("mongoose")



const ConnectDb = async()=> {
      try {
        await mongoose.connect("mongodb://localhost:27017/task_manager")
        console.log("Database Connect SuccessFully")
      } catch (error) {
        console.log(error)
      }
}

ConnectDb()