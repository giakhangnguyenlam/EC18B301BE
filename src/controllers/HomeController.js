const mongoose=require('mongoose');
//const Courses = require('./src/models');
class HomeController{



    index(req,res,next)
    {
      res.json({name:"New test"});
    }
}

module.exports=new HomeController;