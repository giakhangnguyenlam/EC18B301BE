const express=require('express');
const router=express.Router();


const PackagerService=require("../controllers/PackageServiceController");
const { route } = require('./UserRoute');


router.get('/listPackageService',PackagerService.ListPackageService);
router.post('/addlistPackageService',PackagerService.AddPackagerService);
router.put('/updatePackageService/:packagerserivceId',PackagerService.UpdatePackageService);
router.delete('/deletelistPackageService/:packagerserivceId',PackagerService.DeletePackageService);
router.get("/listPackageServiceClasify/:classifyID",PackagerService.ListPackageServiceclassify);
module.exports=router;   