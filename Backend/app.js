const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const orgRouter = require('./routes/org.routes');
const indiRouter = require('./routes/indi.routes');
const taskRouter = require('./routes/tasks.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res,next)=>{
      res.send("hello world");
})

app.use("/org",orgRouter);
app.use("/indi",indiRouter);
app.use("/task",taskRouter);

module.exports = app;