const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//const ObjectID=Schema.ObjectID.ObjectID;

var AutoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection('mongodb+srv://tuantai:tuantai@cluster0.hqaql.mongodb.net/EC18B301?retryWrites=true&w=majority');
AutoIncrement.initialize(connection);



const Enterprise=new Schema({
    TenDoanhNghiep:{type:String, unique: true},
    MatKhau:{type:String},
    SdtDN:{type:String},
    EmailDN:{type:String, unique: true},
    DiaChiDN:{type:String},
    NguoiDaiDien:{type:String},
    Chucvu:{type:String},
    MST:{type:String},
    Loaimathang:{type:String},
    GoiDV:{type:String},
    TrangThai:{type:Number}
})

//Enterprise.plugin(require('mongoose-beautiful-unique-validation'));
Enterprise.plugin(AutoIncrement.plugin,{model: 'Enterprise',field: '_id'});

module.exports=mongoose.model('Enterprise',Enterprise);  

const enterprise = connection.model('Enterprise', Enterprise);