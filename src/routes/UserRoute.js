const express=require('express');
const router=express.Router();

const passport = require("passport");
const users = require('../models/User');

const usercontroller=require('../controllers/UserController');

const ValidationUser=require('../middleware/validationUser');

const userLogin=require("../middleware/userLogInMiddleware");


router.post('/login',usercontroller.login);
router.post('/register',ValidationUser.checkValidUser,usercontroller.AddUser);
router.get('/listUser',userLogin.requiresLogin,usercontroller.ListUser);
router.put('/updateUser/:userID',usercontroller.updateUser);
router.delete('/deleteUser/:userID',usercontroller.deleteUser);
router.get("/OneUser/:userID",usercontroller.OneUser);
router.get("/logout",userLogin.requiresLogin,usercontroller.logout);


module.exports=router;
