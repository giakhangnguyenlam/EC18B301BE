const homeroutes=require('./Homes');
const useroute=require('./UserRoute')
const orderDetail=require('./OrderDetailRoute')
const shipingOrder=require("./ShipingOrder");
const enteprise=require("./EntepriseRouter")
const packagerserivce=require("./PackServiceRouter")
const packagerUsed=require("./PackageUserRouter")
const shipingRice=require("./ShipingRiceRouter")
const priceset=require("./PriceSetRouter")
const session = require('express-session')
 function route(app){
    
    
     app.use('/',homeroutes);
     app.use('/user',useroute);
     app.use('/orderDetail',orderDetail);
     app.use('/shipingOrder',shipingOrder);
     app.use('/enteprise',enteprise);
     app.use('/packageSerivce',packagerserivce);
     app.use('/packagerUsed',packagerUsed);
     app.use("/shipingRice",shipingRice);
     app.use("/priceSet",priceset);
}

module.exports=  route;