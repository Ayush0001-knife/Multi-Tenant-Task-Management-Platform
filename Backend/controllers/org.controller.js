const { validationResult } = require("express-validator");
const organizationModel = require("../models/orgainization.model");
const organizationService = require("../services/organization.service");

module.exports.registerOrganization = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { name, email, password } = req.body;

  const existingOrg = await organizationModel.findOne({ email });
  if (existingOrg) {
    return res.status(400).json({ message: "Organization already exists" });
  }

  const hashedPassword = await organizationModel.hashPassword(password);

  const organization = await organizationService.createOrganization({
    name,
    email,
    password: hashedPassword,
  });
  const token = organization.generateAuthToken();
  res.status(201).json({ token, organization });
};

module.exports.loginOrganization = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const {email, password, key} = req.body;

  const organization = await organizationModel.findOne({ email }).select('+password');
  if (!organization) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  
  const isMatch = await organization.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  
  if (organization.key !== key) {
    return res.status(401).json({ message: "Invalid Key" });
  }
  
  const token = organization.generateAuthToken();
  res.status(200).json({ token, organization }); // ✅ fixed here
}

module.exports.getOrganizations = async(req,res,next)=>{
const {email} = req.body;

const Organization = await organizationModel.find({email});
return res.status(200).json({message: "organization found", Organization});

}