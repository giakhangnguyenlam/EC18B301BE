const mongoose=require("mongoose");

const ShipingRice=require("../models/ShipingPrice");
const Enterprise=require("../models/Enteprise")
class ShipingRiceController
{
    AddShipOrder(req,res,next)
    {
        const shipingPrice=new ShipingRice(req.body);
         shipingPrice.save((err,shipingPrice)=>{
            if(err) throw err;
            var enterpise= Enterprise.findOne({TenDoanhNghiep:shipingPrice.TenDN},(error,enterpise)=>{
                if(enterpise.TrangThai==0)
                {
                    res.status(400).json({"mess":"Enterprise hasn't browses"})
                }
                else
                {
                    if(enterpise.Loaimathang==null||enterpise.Loaimathang=="")
                    {
                        var MatHangUpdate=shipingPrice.LoaiHang;
                        
                    }
                    else
                    {
                        var MatHangUpdate=enterpise.Loaimathang+"-"+shipingPrice.LoaiHang;
                    }
                    Enterprise.updateOne({TenDoanhNghiep: shipingPrice.TenDN},{Loaimathang:MatHangUpdate},(err,result)=>{
                        if(err) throw err;
                        res.status(200).json({"mess":"Add Shipping Rice completed"});
                    })
                    
                }
            });
            //res.status(200).json({"mess":"add P success"});
        });
    }

    ListShipingRice(req,res,next)
    {
        ShipingRice.find({})
        .exec()
        .then(shipingrice=>res.json(shipingrice))
        .catch(error=>res.json({error: error}));

    }
    ListShipigRiceByEnterPrise(req,res,next)
    {
        const name=req.params.NameEnterPrise;
        ShipingRice.find({TenDN:name})
                    .exec()
                    .then(shipingRice=>res.json(shipingRice))
                    .catch(error=>res.json({error:error}));
    }
    UpdateShipingRice(req,res,next)
    {
        const shipingRiceID=req.params.shipingRiceID;
        const shinpingRice=new ShipingRice(req.body);
        ShipingRice.findOneAndUpdate({_id:shipingRiceID},{$set:shinpingRice})
                    .exec().then(()=> res.json({msg:"Update shiping rice completed"}))
                    .catch(error=>res.json({msg:"Update shiping rice failed"}));
    }
    DeleteShipingRice(req,res,next)
    {
        const shipingRiceId=req.params.shipingRiceID;
        ShipingRice.findOneAndDelete({_id:shipingRiceId},(err,result)=>{
         const enterprise=Enterprise.findOne({TenDoanhNghiep:result.TenDN},(error,enterprise)=>{
            let stringInput= enterprise.Loaimathang;
            let stringResult="";
            if(!stringInput.includes("-"))
            {
                stringResult="";
            }
            else
            {
                let string=stringInput.split("-");
                
                for(let i=0;i<string.length;i++)
                {
                    if(string[i]==result.LoaiHang||string[i]=="")
                    {
                        console.log(string[i]);
                        //string.remove(i);
                    }         
                   else
                   {
                       stringResult+=string[i]+"-";
                   }
                }
                console.log(stringResult);
            }
            
            enterprise.Loaimathang=stringResult;
            Enterprise.findOneAndUpdate({TenDoanhNghiep:enterprise.TenDoanhNghiep},{$set:enterprise})
                       .exec().then(()=>res.json({msg:"Delete Shiping rice completed"}))
                       .catch(error=>res.json({error:error}));
           })
         });

         
    }
   
}

module.exports=new ShipingRiceController();