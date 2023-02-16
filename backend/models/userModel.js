const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cryto = require('crypto'); // this is build in module which is already present


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your name"],
        MaxLength:[30,"Name cannot exceed 30 charaters"],
        minLength:[3,"Name should have more than 3 charaters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your Email"],
        unique:true,
        validator:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"],
        minLength:[8,"Password should be greater than 8 charaters"],
        select:false // matlab get karne par isko chodd ke baaki sub send kar dega
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:String
});

userSchema.pre("save",async function(next){ // this type of function is used here not arrow because we have to use this keyword which is not excess in arrow function
    if(!this.isModified("password")){
        next();
    }
    this.password =await bcrypt.hash(this.password,10);
});

//JWT token
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};


//Compare password

userSchema.methods.comparePassword = async function(enteredPassword){
    console.log(await bcrypt.compare(enteredPassword,this.password));
    return await bcrypt.compare(enteredPassword,this.password);
};

// Generating password reset token
userSchema.methods.getResetPasswordToken = function(){
    const restToken = cryto.randomBytes(20).toString("hex") //20 random bytes ki token generate ho rahi h yaha

    // hashing and adding to userSchema
    this.resetPasswordToken = cryto.createHash("sha256").update(restToken).digest("hex");

    //this is used to provide the time to user to change their password 
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return restToken;

}

module.exports = mongoose.model("User",userSchema);
