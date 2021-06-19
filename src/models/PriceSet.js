const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectID=Schema.ObjectID;
//const ObjectID=Schema.ObjectID.ObjectID;
var AutoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection('mongodb+srv://tuantai:tuantai@cluster0.hqaql.mongodb.net/EC18B301?retryWrites=true&w=majority');
AutoIncrement.initialize(connection);


const PriceSet=new Schema({
    DiemDi:{type:String},
    DiemDen:{type:String},
    SoKm:{type:Number},
})


PriceSet.plugin(AutoIncrement.plugin,{model: 'PriceSet',field: '_id'});

module.exports=mongoose.model('PriceSet',PriceSet);

const priceSet = connection.model('PriceSet', PriceSet);