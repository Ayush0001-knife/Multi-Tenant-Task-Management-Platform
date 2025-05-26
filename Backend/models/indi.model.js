const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const indiSchema = new mongoose.Schema({
      name:{
        type: String,
        required: true,
        minlength: [3, "Name must be atleast 3 characters long"],
      },
      email:{
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be atleast 5 characters long"],
      },
      password:{
        type: String,
        required: true,
        select: false,
        minlength: [4, "Password must be atleast 4 characters long"],
      },
      role:{
        type: String,
        required: true,
        enum: ["employee","manager"],
      },
      key:{
        type: Number,
        required: true,
      }
})


indiSchema.methods.generateAuthToken = async function(){
      const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"24h"});
      return token;
}

indiSchema.methods.comparePassword = async function(password){
      return await bcrypt.compare(password,this.password);
}

indiSchema.statics.hashPassword = async function(password){
      return await bcrypt.hash(password,10);
}


const IndiModel = mongoose.model("Individuals",indiSchema);
module.exports = IndiModel;