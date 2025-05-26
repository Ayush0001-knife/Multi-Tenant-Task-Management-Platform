const IndiModel = require("../models/indi.model");
const organizationModel = require("../models/orgainization.model");
const { validationResult } = require("express-validator");
const indiService = require("../services/indi.service");

module.exports.registerIndi = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { name, email, password, role, key } = req.body;

  const organization = await organizationModel.findOne({ key });
  if (!organization) {
    return res.status(401).json({ message: "Invalid Key" });
  }

  const existingIndi = await IndiModel.findOne({ email });
  if (existingIndi) {
    return res.status(400).json({ message: "Individual already exists" });
  }

  const hashedPassword = await IndiModel.hashPassword(password);

  const Individual = await indiService.createIndividual({
    name,
    email,
    password: hashedPassword,
    role,
    key,
  });

  const token = await Individual.generateAuthToken(Individual);

  res.status(201).json({ token, Individual });
};

module.exports.loginIndi = async (req,res,next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

    const {email,password,key} = req.body;

    const Individual = await IndiModel.findOne({email}).select('+password');
    if(!Individual){
      return res.status(401).json({message:"Invalid Email"});
    }

    const isMatch = await Individual.comparePassword(password);
    if(!isMatch){
      return res.status(401).json({message:"Invalid Password"});
    }
    const token = await Individual.generateAuthToken(Individual);
    res.status(200).json({token,Individual});
}


module.exports.getIndiData = async (req, res, next) => {
  const { key } = req.body;

  try {
    const individuals = await IndiModel.find({ 
      key,
      role: 'employee' 
    });

    if (individuals.length === 0) {
      return res.status(404).json({ message: "No employees found with this key" });
    }

    res.status(200).json({ individuals }); 
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error" });
  }
};
