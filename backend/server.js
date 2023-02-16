const app = require('./app');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

const connectDatabase = require("./config/database"); // isko humesha config karne ke baad hi call karna h 

//Handling UnCaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught Exception");
    process.exit(1);;
})


// config
if(process.env.NODE_ENV!=="PRODUCTION"){ // YE LOACL PER CHALANE KE LIYE CONFIG FILE
    dotenv.config({path:"backend/config/config.env"})
}

// connecting to database
connectDatabase();

//using cloudinary for uploading images for backend
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY,
})
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});


//Unhandled  Promise Rejection Error Occurs only when url of the database is worng

process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server dur to unhandled Promise Rejection");

    server.close(()=>{
        process.exit(1);
    });
});