// Creating token and saving in cookie

const sendToken = (user,statusCode,resp)=>{
    const token = user.getJWTToken();

    //Option for coolies
    const options = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly:true
    }

    //stored in cookie
    resp.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token,
    });
};

module.exports = sendToken;