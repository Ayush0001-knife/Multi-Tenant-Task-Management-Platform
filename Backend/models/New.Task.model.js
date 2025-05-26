const mongoose = require("mongoose");


const newTaskSchema = new mongoose.Schema({
      managerEmail:{
        type: String,
        required: true,
      },
      assignTo:{
        type: String,
        required: true,
      },
      employeeEmail:{
        type: String,
        required: true,
      },
      key:{
        type: Number,
        required: true,
      },
      taskData:{
            taskTitle:{
                  type: String,
                  required: true,
                },
                date:{
                  type: Date,
                  required: true,
                  default: () => {
                      const d = new Date();
                      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
                    }          
                },
                deadline:{
                  type: Date,
                  required: true,
                },
                taskDescription:{
                  type: String,
                  required: true,
                },
                category:{
                      type: String,
                      required: true,
                },
      },
      status:{
        type: String,
        required: true,
        default: "New Task",
      }
      
})


const newTaskModel = mongoose.model("NewTasks",newTaskSchema);
module.exports = newTaskModel;