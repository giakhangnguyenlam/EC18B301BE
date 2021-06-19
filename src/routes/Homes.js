const express=require('express');
const router=express.Router();
const homecontroller=require('../controllers/HomeController');



router.get('/',homecontroller.index);





module.exports= router;