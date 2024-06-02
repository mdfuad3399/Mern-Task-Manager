const express = require("express")
const Router = express.Router()

const { registration, login, profileUpdate } = require("../controllers/UserController")
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware")
const { CreateTask, UpdateTaskByStatus,TaskDelete ,ListTaskByStatus,ListTaskCount} = require("../controllers/TaskController")




Router.post('/registration', registration)
Router.post('/login', login)
Router.post('/profileUpdate',AuthVerifyMiddleware , profileUpdate)



Router.post('/CreateTask',AuthVerifyMiddleware , CreateTask)
Router.get('/UpdateTaskByStatus/:id/:status',AuthVerifyMiddleware , UpdateTaskByStatus)
Router.post('/TaskDelete/:id',AuthVerifyMiddleware , TaskDelete)
Router.get('/ListTaskByStatus/:status',AuthVerifyMiddleware , ListTaskByStatus)
Router.get('/ListTaskCount',AuthVerifyMiddleware , ListTaskCount)












module.exports = Router