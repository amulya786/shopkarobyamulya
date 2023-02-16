const catchAsyncErrors = require('../middleWare/catchAsyncError');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req,resp,next)=>{ //isme secret key or pass send karte h
    const myPayment =await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:'inr',
        metadata:{
            company:"shopkaro"
        },
    });

    resp.status(200).json({success:true,client_secret:myPayment.client_secret})
});

exports.sendStripeApiKey = catchAsyncErrors(async (req,resp,next)=>{ // ye stripe api key front me pass karna h toh hume isko send karna hoga
    resp.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY})
});