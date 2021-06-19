const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectID=Schema.ObjectID;
//const AutoIncrement=require('mongoose-auto-increment')(mongoose);
var AutoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection('mongodb+srv://tuantai:tuantai@cluster0.hqaql.mongodb.net/EC18B301?retryWrites=true&w=majority');
AutoIncrement.initialize(connection);



const OrderDetail=new Schema({
    MaDonHang:{type:String,ObjectID},
    TenKhachHang:{type:String},
    SdtKH:{type:String},
    Loaihang:{type:String},
    TenMatHang:{type:String},
    NoiGuiHang:{type:String},
    NoiNhanHang:{type:String},
    NgayVanChuyen:{type:Date},
    ChiPhi:{type:Number},
    GhichuKH:{type:String},
    TrangThai:{type:Number}

})
OrderDetail.plugin(AutoIncrement.plugin,{model: 'OrderDetail',field:'MaDonHang'});

//OrderDetail.plugin(AutoIncrement,{inc_field: 'MaDonHang'});
module.exports=mongoose.model('OrderDetail',OrderDetail);


const orderDetail = connection.model('OrderDetail', OrderDetail);
