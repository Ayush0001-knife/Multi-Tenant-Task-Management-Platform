const IndiModel = require("../models/indi.model");

module.exports.createIndividual = async ({name,email,password,role,key}) =>{
      if(!name || !email || !password || !key || !role){
        throw new Error("All fields are required");
      }

      const Individual = await IndiModel.create({
        name,
        email,
        password,
        role,
        key,
      })

      return Individual;
}