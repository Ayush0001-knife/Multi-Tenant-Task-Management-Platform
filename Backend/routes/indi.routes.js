const express = require("express");
const indiRouter = express.Router();
const { body } = require("express-validator");
const IndiController = require("../controllers/indi.controller");

indiRouter.post(
  "/register",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long"), // Fixed typo in "atleast"
    body("role").isIn(["employee", "manager"]).withMessage("Invalid role"),
    body("key").isLength({ min: 7, max: 7 }).withMessage("Key must be exactly 7 characters"), // Fixed validation
  ],
  IndiController.registerIndi
);

indiRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long"), // Fixed typo
    body("key").isLength({ min: 7, max: 7 }).withMessage("Key must be exactly 7 characters"), // Fixed validation
  ],
  IndiController.loginIndi
);

indiRouter.post("/getdata",IndiController.getIndiData);

module.exports = indiRouter;
