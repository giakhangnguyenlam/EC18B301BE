const express=require('express');
const router=express.Router();



const PriceSetController=require("../controllers/PriceSetContoller");

//router.get('/listPackageService',PackagerService.ListPackageService);
router.post("/addPackageSet",PriceSetController.AddPriceSet);
//router.put('/updatePackageService/:packagerserivceId',PackagerService.UpdatePackageService);
module.exports=router;  