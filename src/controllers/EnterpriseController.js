const mongoose=require('mongoose');
const Enterprise = require('../models/Enteprise');
const bcrypt = require('bcrypt');

class EnterpriseController{

    ListEnterprise(req,res,next)
    {
        Enterprise.find({})
                    .then(Enterprise=>res.json(Enterprise))
                    .catch(error=>res.status(500).send({ message: error.message || "Can show list enterprise"}))
    }

    OneEnterprise(req,res,next)
    {
        Enterprise.findById(req.params.enterpriseID)
          .then( Enterprise=>res.json( Enterprise))
          .catch(err=>{
            if(err.kind==='ObjectId'){
              return res.status(400).send({
                message: "Note not found with id " + req.params.enterpriseID
            });           
            } 
            return res.status(400).send({
              message: "Error retrieving note with id " + req.params.enterpriseID
          });
          });
    }


    
    AddEnterprise(req,res,next)
    {
         //res.json(req.body);
         Enterprise.findOne({EmailDN:req.body.EmailDN},(err,enterprise)=>{
          if(enterprise==null)
          {
            bcrypt.hash(req.body.MatKhau, 10,(err,hash)=>{
              if(err) throw err;
              const enterprise=new Enterprise(req.body);
              enterprise.MatKhau=hash;
              enterprise.TrangThai=0;
              enterprise.save((err,user)=>{
                if(err) throw err;
                res.json({'mess': 'Save complete'});
              });
              })
              
          }
          else{
              res.json({'mess': 'Enterprise have exist'});
          }
          })
       
    }

    browseEnterprise(req,res,next)
    {
      const enterpriseId=req.params.enterpriseID;
      Enterprise.findOneAndUpdate({_id:enterpriseId},{TrangThai:1},(err,result)=>{
        if (err) {
          res.json({msg:err.message})
        } else {
          console.log("Id Enterprised"+ enterpriseId);
          res.json({msg:result});
      }
    })
                // .exec().then(res.json({msg:"Enterprise browse"}))
                // .catch(error=>res.json({msg:error.message}));
    }

    updateEnterprise(req,res,next)
    {
      const id=req.params.enterpriseID;
      const enterpriseUpdate=req.body;
      Enterprise.findOneAndUpdate({_id:id},{$set:enterpriseUpdate})
        .exec()
        .then(()=>
      {
        res.status(200).json({
          success: true,
          message: 'Enterprise is updated',
          enterpriseUpdate: enterpriseUpdate,
        });
      })
        .catch((err)=>{
        res.status(400).json({
          success: false,
          message: 'Update Enterprise failed',
          error:err
        });
      })
    }

    deleteEnterprise(req,res,next)
    {
      console.log("Going to");
      const id=req.params.enterpriseID;
      Enterprise.findOneAndDelete({_id:id})
        .exec()
        .then(()=>
        res.json({'mess': 'Delete success'}))
        .catch((err) => res.json({'mess': 'Delete unsuccess'}));
    }


    
    login(req,res,next)
    {
      Enterprise.findOne({EmailDN:req.body.EmailDN}).exec((err,user)=>{

        if(!user)
         return res.json({err:"Username or Password is incorrect"});
         else
        {
            bcrypt.compare(req.body.MatKhau, user.MatKhau, (err, result)=>{
                if(result === true){
                    req.session.enterprise = user
                    res.json({  
                        user: user,
                        "login": "success"
                    }, )
                }else{
                    return res.json({err: 'Email or Password is incorrect'})
                }
             })
        } 
    })
  }
    logout(req,res)
    {
      if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return res.json({err});
            } else {
                return res.json({'logout': "Success"});
            }
        });
    }
    }

}

module.exports=new EnterpriseController;