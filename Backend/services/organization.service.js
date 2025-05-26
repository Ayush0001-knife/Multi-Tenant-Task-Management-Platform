const organizationModel = require("../models/orgainization.model");

module.exports.createOrganization = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const organization = await organizationModel.create({
    name,
    email,
    password,
  })

  return organization;
};
