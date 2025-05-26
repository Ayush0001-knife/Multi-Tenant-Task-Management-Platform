const express = require('express');
const orgRouter = express.Router();
const {body} = require('express-validator');
const orgController = require('../controllers/org.controller');

orgRouter.post('/register', [
    body('name').notEmpty().withMessage('OrgName is required'),
    body('email').isEmail().withMessage('Invalid-Email'),
    body('password').isLength({min:4}).withMessage('Password must be atleast 4 characters long'),
], orgController.registerOrganization);

orgRouter.post('/login', [
    body('email').isEmail().withMessage('Invalid-Email'),
    body('password').isLength({min:4}).withMessage('Password must be atleast 4 characters long'),
    body('key').isLength({min:7}).withMessage("Invalid-Key")
], orgController.loginOrganization);

orgRouter.post('/getall',orgController.getOrganizations);


module.exports = orgRouter;