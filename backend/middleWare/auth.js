const ErroHandler = require('../Utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncError');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


exports.isAuthenticatedUser = catchAsyncErrors(async (req,resp,next)=>{
    const {token} = req.cookies;

    // console.log(token);
    if(!token){
        return next(new ErroHandler("Please login to access this resource",401))
    }
    
    const decodeedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodeedData.id);
    // console.log(req.user);
    next();
});


exports.authorizationRoles = (...roles)=>{
    return (req,resp,next)=>{
        // console.log(req.user);
        if(!roles.includes(req.user.role)){
        // console.log("running");
            return next( new ErroHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));
        };
    next();
    };
};