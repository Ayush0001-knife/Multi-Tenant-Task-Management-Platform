const express = require('express');
const taskRouter = express.Router();
const {body} = require('express-validator');
const taskController = require('../controllers/tasks.controller');


taskRouter.post('/new',[
      body('managerEmail').isEmail(),
      body('assignTo').isString(),
      body('employeeEmail').isEmail(),
      body('key').isNumeric(),
      body('taskData.taskTitle').isString(),
      body('taskData.deadline').isString(),
      body('taskData.taskDescription').isString(),
      body('taskData.category').isString(),
],taskController.newTask);

taskRouter.post('/getall',taskController.getAllTasks);

taskRouter.post('/active',taskController.activeTask);


module.exports = taskRouter;