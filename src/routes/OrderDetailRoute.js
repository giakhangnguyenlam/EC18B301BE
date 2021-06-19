const express=require('express');
const router=express.Router();

const OrderDetailController= require('../controllers/OrderDetailController');

router.get('/listOrder',OrderDetailController.ListOrderDetail);
router.post('/addOrderDetail',OrderDetailController.AddOrderDetail);
router.get('/OneOrder/:orderId',OrderDetailController.OneOrderDetail);
router.delete('/deleteOrder/:orderId',OrderDetailController.DeleteOrderDetail);
router.put('/updateOrder/:orderId',OrderDetailController.UpdateOrderDetail);
router.get("/listOrderByState/:state",OrderDetailController.ListOrderDetailByState);


module.exports=router;

