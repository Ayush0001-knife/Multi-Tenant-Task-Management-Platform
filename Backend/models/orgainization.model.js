const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const organizationSchema = new mongoose.Schema({
      name:{
        type: String,
        required: true,
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
      key:{
            type: Number,
            unique:true,
            length:7,
      }
})

organizationSchema.methods.generateAuthToken = function(){
      const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"24h"});
      return token;
}

organizationSchema.methods.comparePassword = async function(password){               
      return await bcrypt.compare(password,this.password);
}

organizationSchema.statics.hashPassword = async function(password){                
      return await bcrypt.hash(password,10);
}

organizationSchema.pre("save", async function (next) {
      if (!this.key) {
        let uniqueKey;
        let exists = true;
    
        while (exists) {
          uniqueKey = Math.floor(1000000 + Math.random() * 9000000); 
          const existing = await mongoose.models.Organization.findOne({ key: uniqueKey });
          if (!existing) {
            exists = false;
          }
        }
    
        this.key = uniqueKey;
      }
      next();
    });

const organizationModel = mongoose.model("Organization",organizationSchema)

module.exports = organizationModel;