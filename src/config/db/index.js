const mongoose=require('mongoose')

async function connect(){
    try{
        await mongoose.connect('mongodb+srv://tuantai:tuantai@cluster0.hqaql.mongodb.net/EC18B301?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
    console.log('Connect successfully')
    }
    catch(error){
        console.log('Connect unsuccessfully')
    }
}
module.exports={connect};