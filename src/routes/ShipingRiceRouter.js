const express=require('express');
const router=express.Router();


const ShipingRiceController=require("../controllers/ShippingRiceController");
const { route } = require('./UserRoute');


router.post('/addShipingRice/',ShipingRiceController.AddShipOrder);
 router.put('/updateShipingRice/:shipingRiceID',ShipingRiceController.UpdateShipingRice);
 router.delete('/deleteShipingRice/:shipingRiceID',ShipingRiceController.DeleteShipingRice);
 router.get('/listShingpingRice',ShipingRiceController.ListShipingRice);
 router.get('/listShingpingRiceByName/:NameEnterPrise',ShipingRiceController.ListShipigRiceByEnterPrise);

module.exports=router;   