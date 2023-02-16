const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErroHandler = require('../Utils/errorHandler');
const catchAsyncErrors = require('../middleWare/catchAsyncError');

//Create new order
exports.newOrder = catchAsyncErrors(async (req, resp, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    resp.status(201).json({
        status: true,
        order
    })
});

//Get single Order
exports.getSingleOrder = catchAsyncErrors(async (req, resp, next) => {
    //Populate ka kaam h ki wo user ki id le ke user wale database se uska name or email le aaye
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErroHandler("Order not found with this id", 404));
    };
    resp.status(200).json({
        success: true,
        order
    })
})

//Get All order (like myorders) ki tarah saare user ko unka order dikh jaaega
exports.myOrder = catchAsyncErrors(async (req, resp, next) => {

    const order = await Order.find({
        user: req.user._id
    }); //User ka all order fetch user ki id ke hisab se

    if (!order) {
        return next(new ErroHandler("Order not found with this id", 404));
    };

    resp.status(200).json({
        success: true,
        order
    })
})

//Get All order Amount --> Admin
exports.getAllOrders = catchAsyncErrors(async (req, resp, next) => {

    const orders = await Order.find(); //User ka all order fetch

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    });

    resp.status(200).json({
        success: true,
        totalAmount,
        orders
    })
});

//update order status order Amount --> Admin
exports.updateOrder = catchAsyncErrors(async (req, resp, next) => {

    const orders = await Order.findById(req.params.id); 

    if(!orders){
        return next(new ErroHandler("No such order is present",400));
    }

    if(orders.orderStatus === "Delivered"){
        return next(new ErroHandler("You have already deliverd this order",400));
    }

    if(req.body.status==="Shipped"){
        orders.orderItems.forEach(async (order)=>{
            await updateStock(order.product, order.quantity);
        });
    }

    orders.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        orders.deliveredAt = Date.now();
    }

    await orders.save({validateBeforeSave:false});

    resp.status(200).json({
        success: true,
        message:"Status Updated"
    })
})
// this function is used above in the update order
async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.stock -= quantity;
    await product.save({validateBeforeSave:false});
}

//Delete order order Amount --> Admin
exports.deleteOrder = catchAsyncErrors(async (req, resp, next) => {

    const order = await Order.findById(req.params.id); //User ka all order fetch

    if(!order){
        return next(new ErroHandler("No such order is present",400));
    }

    await order.remove();
 
  
    resp.status(200).json({
        success: true,
    })
})
