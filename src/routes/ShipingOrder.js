const express=require('express');
const router=express.Router();


const ShipingOrderController=require("../controllers/ShippingOrderController");
const { route } = require('./UserRoute');


router.get('/listShipingOrder/:TenDN',ShipingOrderController.ListShipingOrder);
router.get('/listShipingOrderByState/:state',ShipingOrderController.ListShipingOrderByState);
router.post('/addShipingOrder',ShipingOrderController.AddShipOrder);
router.put('/updateShipingOrder/:orderId',ShipingOrderController.UpdateShipOrder);
router.delete('/deleteShipingOrder/:MaDonHang',ShipingOrderController.DeleteShippingOrder);
router.post("/changeState",ShipingOrderController.ChangeState);
router.get("/listShipingOrderAll",ShipingOrderController.ListShipingOrderAll);
module.exports=router;   