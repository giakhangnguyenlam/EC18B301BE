const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectID=Schema.ObjectID;

var AutoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection('mongodb+srv://tuantai:tuantai@cluster0.hqaql.mongodb.net/EC18B301?retryWrites=true&w=majority');
AutoIncrement.initialize(connection);



const ShipingPrice=new Schema({
    TenDN:{type:String},
    LoaiHang:{type:String},
    CanNang:{type:Number},
    KhoangCach:{type:Number},
    GiaVanChuyen:{type:Number},
    ThoiGianGiaoHang:{type:Number}

},
{
    MaGoi:false,
})

ShipingPrice.plugin(AutoIncrement.plugin,{model: 'ShipingPrice',field: '_id'});

module.exports=mongoose.model('ShipingPrice',ShipingPrice);
const shipingPrice = connection.model('ShipingPrice', ShipingPrice);