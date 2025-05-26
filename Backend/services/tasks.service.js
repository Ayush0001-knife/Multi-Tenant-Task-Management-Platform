const newTaskModel = require("../models/New.Task.model");

module.exports.createNewTask = async ({managerEmail,assignTo,employeeEmail,key,taskTitle,deadline,taskDescription,category}) => {
  if(!managerEmail || !assignTo || !employeeEmail || !key || !taskTitle || !deadline || !taskDescription || !category){
    throw new Error("All fields are required");
  }

  const newTask =  newTaskModel.create({
    managerEmail,
    assignTo,
    employeeEmail,
    key,
    taskData:{
      taskTitle,
      deadline,
      taskDescription,
      category,
    }
  });

  return newTask;


}