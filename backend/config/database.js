const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URL).then((data)=>{
        console.log(`MongoDB connected with server:${data.connection.host}`);
    });
    // .catch((err)=>{         Here we are using the Unhandled server rejection Error So, don't have to use the catch block
    //     console.log(err);
    // })
}

module.exports = connectDatabase