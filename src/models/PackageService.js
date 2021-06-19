const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectID=Schema.ObjectID;

var AutoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection('mongodb+srv://tuantai:tuantai@cluster0.hqaql.mongodb.net/EC18B301?retryWrites=true&w=majority');
AutoIncrement.initialize(connection);



const PackageService=new Schema({
    PhanLoai:{type:String},
    TenGoi:{type:String},
    ThoiGian:{type:Number},
    Gia:{type:Number},
    DacDiem:{type:String}
},
{
    MaGoi:false,
})

PackageService.plugin(AutoIncrement.plugin,{model: 'PackageService',field: '_id'});

module.exports=mongoose.model('PackageService',PackageService);
const packageService = connection.model('PackageService', PackageService);