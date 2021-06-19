const mongoose=require('mongoose');

const PackageService=require('../models/PackageService');

class PackageServiceController
{

    AddPackagerService(req,res,next)
    {
        const packagerserivce=new PackageService(req.body);
        packagerserivce.save((err,packagerserivce)=>{
            if(err) throw err;
            res.status(200).json({"mess":"add package success"});
        });
    }
    UpdatePackageService(req,res,next)
    {
        const packagerserivceId=req.params.packagerserivceId;
        const packagerserivce=req.body;
        PackageService.findOneAndUpdate({_id:packagerserivceId},{$set:packagerserivce},(error,result)=>{
            if(error) throw res.json({
                success: false,
                message: 'Package service update failed. Please try again.',
                error:error
              });;
              res.json({
                success: true,
                message: result,
              });
            
        })
    }
    ListPackageService(req,res,next)
    {
        PackageService.find({})
                    .then(packagerserivce=>res.json(packagerserivce))
                    .catch(error=>res.status(400)
                                    .send({message: err.message || "Some error occurred while retrieving notes."}));
    }
    ListPackageServiceclassify(req,res,next)
    {
        const clasify=req.params.classifyID;
        PackageService.find({PhanLoai:clasify})
                    .then(packagerserivce=>res.json(packagerserivce))
                    .catch(error=>res.status(400)
                                    .send({message: err.message || "Some error occurred while retrieving notes."}));
    }
    OnePackageService(req,res,next)
    {
        PackageService.findById(req.params.packageServiceID)
          .then(packagerserivce=>res.json(packagerserivce))
          .catch(err=>{
            if(err.kind==='ObjectId'){
              return res.status(400).send({
                message: "Note not found with id " + req.params.packageServiceID
            });           
            } 
            return res.status(400).send({
              message: "Error retrieving note with id " + req.params.packageServiceID
          });
          });
    }
    DeletePackageService(req,res,next)
    {
        const packagerserivceId=req.params.packagerserivceId;
        PackageService.findOneAndDelete({MaGoi:packagerserivceId})
                       .exec()
                       .then(()=>{
                        res.status(200).json({
                            success: true,
                            message: 'Package service delete',
                          });
                    })
                        .catch(error=>
                            {
                                res.status(400).json({
                                    success: false,
                                    message: 'Package service delete failed. Please try again.',
                                    error:error
                                  });  
                            })
    }
}

module.exports=new PackageServiceController();