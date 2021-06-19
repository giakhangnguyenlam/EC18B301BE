const mongoose=require("mongoose");
const OrderDetail=require("../models/OrderDetail");
const PriceSet = require("../models/PriceSet");
const ShipingOrder = require("../models/ShipingOrder");
const ShipingPrice = require("../models/ShipingPrice");
const moment=require("moment");

class OrderDetailController
{
    ListOrderDetail(req,res,next)
    {
        OrderDetail.find({})
        .then(OrderDetail=>res.json(OrderDetail))
        .catch(error=>res.status(500).send({message: err.message || "Some error occurred while retrieving notes."}))
    }
    ListOrderDetailByState(req,res,next)
    {
        OrderDetail.find({TrangThai:req.params.state})
        .then(OrderDetail=>res.json(OrderDetail))
        .catch(error=>res.status(500).send({message: err.message || "Some error occurred while retrieving notes."}))
    }
    OneOrderDetail(req,res,next)
    {
        console.log(req.params.orderId);
        OrderDetail.findOne({MaDonHang:req.params.orderId})
                    .then(OrderDetail=>res.status(200).json(OrderDetail))
                    .catch(error=>{
                        if(error.kind==='ObjectId')
                        {
                            return res.status(400).send({
                                message: "Note not found with id " + req.params.orderId
                            }); 
                        }
                        return res.status(400).send({
                            message: "Error retrieving note with id " + req.params.orderId
                        });
                    })
    }
    UpdateOrderDetail(req,res,next)
    {
        const orderId=req.params.orderId;
        const OrderDetailupdate=req.body;
        OrderDetail.findOneAndUpdate({_id:orderId},{$set:OrderDetailupdate})
                    .exec()
                    .then((result)=>
                    {
                        ShipingOrder.findOneAndUpdate({MaDonHang:result.MaDonHang},{Gia:result.ChiPhi},(err,shipingorder)=>{
                            if(err) throw err;
                            res.status(200).json({
                                success: true,
                                message: 'User is updated',
                                OrderDetailupdate: OrderDetailupdate,
                              });
                        })
                        })
                          .catch((err)=>{
                          res.status(400).json({
                            success: false,
                            message: 'Server error. Please try again.',
                            error:err
                          });
                    })
    }
    DeleteOrderDetail(req,res,next)
    {
        const orderId=req.params.orderId;
        const orderDetail=OrderDetail.findOne({MaDonHang:orderId});
        if(orderDetail.TrangThai=="3"||orderDetail.TrangThai=="4"||orderDetail.TrangThai=="2")
        {
            res.json({"msg":"Order had deliveried"});
        }
        else
        {
            console.log(orderId);
            OrderDetail.findOneAndDelete({MaDonHang:orderId},(error,result)=>
            {
                console.log(result);
                ShipingOrder.findOneAndDelete({MaDonHang:result.MaDonHang})
                            .exec()
                            .then(()=>res.json({'mess': 'Delete success'}))
                            .catch(error=>res.json({'mess': 'Delete unsuccess'}));      
            })
        }
        
    }

    AddOrderDetail(req,res,next)
    {
        const orderAdd=new OrderDetail(req.body);
        orderAdd.NgayVanChuyen=moment().format();
        PriceSet.findOne({DiemDi:orderAdd.NoiGuiHang,DiemDen:orderAdd.NoiNhanHang},(error,priceset)=>{
            if(error) throw error;
            ShipingPrice.findOne({TenDN:req.body.TenDN,LoaiHang:orderAdd.Loaihang},(error,shipingrice)=>{
                if(error) throw error;
                let cost=priceset.SoKm*shipingrice.GiaVanChuyen;
                orderAdd.$set("ChiPhi",cost);
                
                orderAdd.save((err,orderAdd)=>{
                    if(err) throw err;
                    console.log(orderAdd);
                    let shipingOrder=new ShipingOrder();
                    shipingOrder.MaDonHang=orderAdd.MaDonHang;
                    shipingOrder.Gia=orderAdd.Gia;
                    shipingOrder.TenDN=req.body.TenDN;
                    shipingOrder.TrangThai=1;
                    shipingOrder.GhichuDN=req.body.GhichuKH;
                    shipingOrder.save((error,shipingOrder)=>{
                        if(error) throw error;
                        res.status(200).json({'msg':"Add order success"});
                    })            
                    });
            })
            })
            
        
    }
}

module.exports=new OrderDetailController;