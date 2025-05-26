const newTaskModel = require("../models/New.Task.model");
const { validationResult } = require("express-validator");
const tasksService = require("../services/tasks.service");

module.exports.newTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const {
    managerEmail,
    assignTo,
    employeeEmail,
    key,
    taskData: { taskTitle, deadline, taskDescription, category },
  } = req.body;
  

  const newTask = await tasksService.createNewTask({
    managerEmail,
    assignTo,
    employeeEmail,
    key,

    taskTitle,
    deadline,
    taskDescription,
    category,
  });

  return res
    .status(200)
    .json({ message: "Task created successfully", newTask });
};


module.exports.getAllTasks = async (req,res,next) => {
  const {employeeEmail , key} = req.body;

  const Tasks = await newTaskModel.find({employeeEmail, key});
  return res.status(200).json({message: "All Tasks", Tasks});
}


module.exports.activeTask = async (req,res,next) => {
  const {_id} = req.body;
}