const mongoose=require('mongoose');
const PackageUsed = require('../models/PackageUsed');
const moment=require("moment");
const PackageService = require('../models/PackageService');

class PackageUsedController
{
    AddPackagerUsed(req,res,next)
    {
        const packagerUsed=new PackageUsed(req.body);
        PackageUsed.findOneAndDelete({TenNguoiSuDung:packagerUsed.TenNguoiSuDung},(error,result)=>{
            PackageService.findOne({_id:packagerUsed.MaGoi},(error,packagerserivce)=>{
                if(error) throw error;
                let dateEnd=moment().add(packagerserivce.ThoiGian,'days');
                packagerUsed.ThoiGianConLai=dateEnd;
                console.log(dateEnd);
                packagerUsed.save((err,packagerUsed)=>{
                    if(err) throw err;
                    res.status(200).json({packagerUsed:packagerUsed});
                });
            })
            
            
        })  
    }
    ListPackagerUsed(req,res,next)
    {
        PackageUsed.find({})
                    .then(packagerserivce=>res.json(packagerserivce))
                    .catch(error=>res.status(400)
                                    .send({message: err.message || "Some error occurred while retrieving notes."}));
    }
    PackagerUsedByUserName(req,res,next)
    {
        const username=req.body.username;
        PackageUsed.find({TenNguoiSuDung:username})
                    .then(packagerUsed=>res.json(packagerUsed))
                    .catch(err=>res.status(400).send({message: err.message || "Some error occurred while retrieving notes."}))
    }
    DeletePackageUsed(req,res,next)
    {
        const packusedID=req.params.packusedID;
        PackageUsed.findOneAndDelete({_id:packusedID})
                    .exec()
                    .then(()=>res.json({mess:"Delete success"}))
                    .catch(err=>res.json({message: err.message }))
    }

    ListPackagerUsedByName(req,res,next)
    {
        const name=req.params.NameUsed;
        PackageUsed.findOne({TenNguoiSuDung:name})
                    .exec().then(packagerUsed=>res.json({packagerUsed:packagerUsed}))
                    .catch(error=>res.json({error:error.message}));
    }
    
    ListPackagerUsedByIDPackage(req,res,next)
    {
        const packusedId=req.params.packusedId;
        PackageUsed.find({MaGoi:packusedId})
                    .exec()
                    .then(packagerUsed=>res.json(packagerUsed))
                    .catch(err=>res.status(400).send({message: err.message || "Some error occurred while retrieving notes."}))

    }
    ListPackagerUsed(req,res,next)
    {
        
        PackageUsed.findOne({})
                    .exec().then(packagerUsed=>res.json({packagerUsed:packagerUsed}))
                    .catch(error=>res.json({error:error.message}));
    }
    CheckOutOfDate(req,res,next)
    {
        const name=req.params.name;
        PackageUsed.find({TenNguoiSuDung:name},(err,result)=>{
            let dateCheck=moment();
            if(dateCheck.isAfter(result.ThoiGianConLai))
            {
                res.json({msg:"Package used have out of date"});
            }
            res.json({msg:"Package still use"})
        })
    }

}

module.exports=new PackageUsedController();