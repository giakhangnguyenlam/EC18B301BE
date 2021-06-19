const express=require('express');
const router=express.Router();

const passport = require("passport");
const enterprise = require('../models/Enteprise');

const enterprisecontroller=require('../controllers/EnterpriseController');

const ValidationEnterprise=require('../middleware/validationEnterprise');

const userLogin=require("../middleware/userLogInMiddleware");


router.post('/login',enterprisecontroller.login);
router.post('/register',ValidationEnterprise.checkValidenterprise,enterprisecontroller.AddEnterprise);
router.get('/listEnterprise',userLogin.requiresLoginenterPrise,enterprisecontroller.ListEnterprise);
router.put('/updateEnterpriser/:enterpriseID',enterprisecontroller.updateEnterprise);
router.delete('/deleteEnterprise/:enterpriseID',enterprisecontroller.deleteEnterprise);
router.get("/OneEnterprise/:enterpriseID",enterprisecontroller.OneEnterprise);
router.get("/logout",userLogin. requiresLoginenterPrise,enterprisecontroller.logout);
router.put('/browsingEnterprise/:enterpriseID',enterprisecontroller.browseEnterprise);

module.exports=router;
