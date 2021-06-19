const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectID=Schema.ObjectID;
//const ObjectID=Schema.ObjectID.ObjectID;
var AutoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection('mongodb+srv://tuantai:tuantai@cluster0.hqaql.mongodb.net/EC18B301?retryWrites=true&w=majority');
AutoIncrement.initialize(connection);


const PackageUsed=new Schema({
    MaGoi:{type:String},
    TenNguoiSuDung:{type:String},
    Gia:{type:Number},
    ThoiGianConLai:{type:Date},
    TrangThai:{type:String},
})


PackageUsed.plugin(AutoIncrement.plugin,{model: 'PackageUsed',field: '_id'});

module.exports=mongoose.model('PackageUsed',PackageUsed);

const packageUsed = connection.model('PackageUsed', PackageUsed);
