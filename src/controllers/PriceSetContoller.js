const mongoose=require("mongoose");

const PriceSet=require("../models/PriceSet");

class PriceSetController
{

    AddPriceSet(req,res,next)
    {
        const priceset=new PriceSet(req.body);
        priceset.save((error,pricset)=>{
            if(error) throw error;
            res.json({"priceset":priceset})
        });
    }
}

module.exports=new PriceSetController();