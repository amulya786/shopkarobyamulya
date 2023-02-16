const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const path = require("path");
const errorMiddleWare = require('./middleWare/error');

// config
if(process.env.NODE_ENV!=="PRODUCTION"){ // YE LOACL PER CHALANE KE LIYE CONFIG FILE
    dotenv.config({path:"backend/config/config.env"})
}


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true,parameterLimit:10000,limit:"50mb"}));
app.use(fileUpload());

// Route imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoutes');


app.use("/api/v1",productRoute);
app.use("/api/v1",userRoute);
app.use("/api/v1",order);
app.use("/api/v1",payment);

app.use(express.static(path.join(__dirname,"../front/build")));

app.get("*",(req,resp)=>{
    resp.sendFile(path.resolve(__dirname,"../front/build/index.html"))
})
//Middle ware for Errors
app.use(errorMiddleWare);

module.exports = app;