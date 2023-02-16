const ErroHandler = require('../Utils/errorHandler');
const catchAsyncErrors = require('../middleWare/catchAsyncError');
const sendEmail = require('../Utils/sendEmail')
const User = require('../models/userModel');
const sendToken = require('../Utils/jwtToken');
const cloudinary = require('cloudinary');
const cryto = require('crypto');


//Register a User 
exports.registerUser = catchAsyncErrors(async (req, resp, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
    })

    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });


    // const token = user.getJWTToken(); 
    // this is my funciton to reduce the given lines
    sendToken(user, 201, resp);// resp.status(201).json({
    //     success:true,
    //     token,
    // });
});

//Login User
exports.loginUser = catchAsyncErrors(async (req, resp, next) => {
    const { email, password } = req.body;
    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErroHandler("Please enter email & password ", 400))
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErroHandler("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    // console.log("isPasswordMatched",isPasswordMatched);
    if (!isPasswordMatched) {
        return next(new ErroHandler("Invaild email or password", 401)); // here we are giving email because if some user try to right wrong password then it will give error for both
    }

    sendToken(user, 200, resp);
});

//User LogOUt

exports.logout = catchAsyncErrors(async (req, resp, next) => {

    resp.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    resp.status(200).json({
        success: true,
        message: "Logged Out"
    });
});

// Forget Password
exports.forgetPassword = catchAsyncErrors(async (req, resp, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErroHandler("User not found", 404));
    }
    // //Get RestPassword Token 
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false }); // ye iss liye h kyu ki abhi user banna nahi h toh reset se pahle uskoo save karna h

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    // const resetPasswordUrl = `${process.env.FRONT_END_URL}${resetToken}`;
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    const message = `Your password rest Token is :-\n\n${resetPasswordUrl}\n\n if you have not requested this mail then,
    // ignore it.`;
    try {
        // Try me humko ek method banana h jo send email karegi
        await sendEmail({
            email: user.email,
            subject: "Ecommerce Password Recovery",
            message
        });
        resp.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`
        });

    } catch (error) {
        user.resetPasswordToken = undefined; // ye sub value ko undefinded karna hoga error par
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false }); // yaha par iss liye dobara kiye taki messge re-save ho jaae  
        return next(new ErroHandler(`Error is:-${error.message}`, 500))
    }
});

//Reseting the password
exports.resetPassword = catchAsyncErrors(async (req, resp, next) => {
    //creating token hash
    const resetPasswordToken = cryto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ErroHandler("Reset password token is invaild or has expired", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErroHandler("Password does not match confirm-password"), 400);
    };

    user.password = req.body.newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, resp);

});

//This is used for the user who is logged in and wants to check their details
exports.getUserDetails = catchAsyncErrors(async (req, resp, next) => {
    const user = await User.findById(req.user.id);
    resp.status(200).json({
        status: true,
        user
    })
});

//Update user password
exports.updateUserPassword = catchAsyncErrors(async (req, resp, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldpassword);

    if (!isPasswordMatched) {
        return next(new ErroHandler("Old password is incorrect", 400)); // here we are giving email because if some user try to right wrong password then it will give error for both
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErroHandler("Password does not matched with confim-password", 400)); // here we are giving email because if some user try to right wrong password then it will give error for both
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, resp)
});


//Update user profile
exports.updateUserProfile = catchAsyncErrors(async (req, resp, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    //we will add cloudinary later
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        });
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    resp.status(200).json({
        success: true,

    })
});

//get all user details by admin

exports.getAllUser = catchAsyncErrors(async (req, resp, next) => {
    const users = await User.find();

    resp.status(200).json({
        success: true,
        Count: users.length,
        users
    });
});

//get single user details 

exports.getSingleUser = catchAsyncErrors(async (req, resp, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErroHandler("User does not exist"), 400);
    }



    resp.status(200).json({
        success: true,
        user
    });
});

//Admin kisi ki profile update kar sake
exports.updateUserRoleByAdmin = catchAsyncErrors(async (req, resp, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    let user = User.findById(req.params.id);
    if(!user){
        return next(
            new ErroHandler("User doest not exist with this id",400)
        );
    }
    //we will add cloudinary later

     user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    resp.status(200).json({
        success: true,

    });
});

//Admin kisi ki profile delete kar sake
exports.deleteUserRoleByAdmin = catchAsyncErrors(async (req, resp, next) => {

    const user = await User.findById(req.params.id);
    //if user not found 
    if (!user) {
        return next(new ErroHandler(`User not found with id ${req.params.id}`, 400))
    };

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);
    await user.remove();

    resp.status(200).json({
        success: true,
        message: "User delete successfully"
    });
});



