const ErroHandler = require('../Utils/errorHandler');

module.exports = (err,req,resp,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";

    if(err.name === "CastError") //  This is type of error like wrong id length name etc send to the server
    {
        const message = `Resource not found: Invalid: ${err.path}`;
        err = new ErroHandler(message,400)
    }

    resp.status(err.statusCode).json({
        success:false,
        message:err.message
    });
}