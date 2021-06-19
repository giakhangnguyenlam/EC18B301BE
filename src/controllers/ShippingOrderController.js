const mongoose=require("mongoose");
const OrderDetail = require("../models/OrderDetail");
const ShipingOrder=require("../models/ShipingOrder");

class ShipingOrderController
{
    //
    AddShipOrder(req,res,next)
    {
        const shipingorder=new ShipingOrder(req.body);
        shipingorder.save((err,shipingorder)=>{
            if(err) throw err;
            res.status(200).json({"mess":"add success"});
        });
    }
    UpdateShipOrder(req,res,next)
    {
        const orderId=req.params.orderId;
        const shipingOrder=req.body;
        ShipingOrder.findByIdAndUpdate({_id:orderId},{$set:shipingOrder})
                    .exec()
                    .then(()=>{
                        res.status(200).json({
                            success: true,
                            message: 'ShipingOrder updated',
                            shipingOrder: shipingOrder,
                          });
                    })
                    .catch((err)=>{
                        res.status(400).json({
                            success: false,
                            message: 'Server error. Please try again.',
                            error:err
                          });
                    })
    }
    ListShipingOrder(req,res,next)
    {
        const TenDN=req.params.TenDN;
        ShipingOrder.find({TenDN:TenDN})
                    .then(shipingOrder=>res.json(shipingOrder))
                    .catch(error=>res.json({message: error.message }));
    }
    ListShipingOrderByState(req,res,next)
    {
        ShipingOrder.find({TrangThai:req.params.state})
                    .then(shipingOrder=>res.json(shipingOrder))
                    .catch(error=>res.json({message: error.message }));
    }
    DeleteShippingOrder(req,res,next)
    {
        const MaDonHang=req.params.MaDonHang;
        ShipingOrder.updateOne({MaDonHang:MaDonHang},{$set:{TrangThai:-1}})
                    .then(()=>
                    res.status(200).json({success: true,message:"Delete success"}))
                    .catch((err)=>{
                        res.status(400).json({
                            success: false,
                            message:"Delete unsuccess"
                        })
                    })
    }
// 1:Chờ xác nhận, 2:Đã lấy hàng 3 Giao hàng thành công 4: Trả hàng
    ChangeState(req,res,next)
    {
        const ShipingOrderId=req.body.ShipingOrderID;
        const state=req.body.StateShiping;
        ShipingOrder.findOneAndUpdate({_id:ShipingOrderId},{TrangThai:state},(error,result)=>{
            if(error) throw res.json({msg:error.message});;
            OrderDetail.findOneAndUpdate({MaDonHang:result.MaDonHang},{TrangThai:state},(error,result)=>{
                if(error) throw res.json({msg:error.message});;
                res.json({msg:"Change to sucess"});
            })
        })
    }
    ListShipingOrderAll(req,res,next)
    {
        ShipingOrder.find()
                    .then(shipingOrder=>res.json(shipingOrder))
                    .catch(error=>res.status(500)
                                    .send({message: err.message || "Some error occurred while retrieving notes."}));
    }

}
module.exports=new ShipingOrderController;