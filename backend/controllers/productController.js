const Product = require('../models/productModel');
const ErroHandler = require('../Utils/errorHandler');
const catchAsyncErrors = require('../middleWare/catchAsyncError');
const ApiFeatures = require('../Utils/apiFeatures');
const cloudinary = require('cloudinary');


// Create Product -- This can be controlled by only Admin
exports.createProduct = catchAsyncErrors(async (req, resp, next) => {
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        });
    }
    req.body.images = imagesLink;
    req.body.user = req.user.id; // here the user id is save in the database by default so ,we can easly ack that which user has added the product

    const product = await Product.create(req.body);
    resp.status(201).json({
        success: true,
        product
    });
});


//Get All products
exports.getAllProducts = catchAsyncErrors(async (req, resp, next) => {

    const resultPerPage = 8;
    // return next(new ErroHandler("Custom error",400));
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);

    const products = await apiFeatures.query;
    const resultAfterFilter = products.length;

    resp.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage: Math.ceil(productCount / resultPerPage),
        resultAfterFilter
    })
});
//Get All products admin
exports.getAdminProducts = catchAsyncErrors(async (req, resp, next) => {

    const products = await Product.find();
    resp.status(200).json({
        success: true,
        products,
    })
});

// To get the single product by using id
exports.getProductDetails = catchAsyncErrors(async (req, resp, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErroHandler("Product Not Found", 404));
    }
    resp.status(200).json({
        success: true,
        product,
    })

});

// Update products--> this can be also access by only the admin
exports.updateProduct = catchAsyncErrors(async (req, resp, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErroHandler("Product Not Found", 404));
    }
    //images starts here
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }
    if (images !== undefined) {
        //deletig images from cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
        const imagesLink = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }

        req.body.images = imagesLink;
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    resp.status(200).json({
        success: true,
        product
    })
});

//Deleting the product form the data base --> this can by also done by only admin
exports.deleteProduct = catchAsyncErrors(async (req, resp, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErroHandler("Product Not Found", 404));
    }

    //deletig images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();

    resp.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })

});

//Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, resp, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev => rev.user.toString() === req.user._id.toString())
                rev.rating = rating,
                    rev.comment = comment
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    // Average of the rating off all users

    let avg = 0;

    product.reviews.forEach(rev => {
        avg += rev.rating
    })


    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    resp.status(200).json({
        success: true
    })
});


// Get All reviews of the single Product

exports.getProductReviews = catchAsyncErrors(async (req, resp, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErroHandler("Product Not Found", 404));
    }

    resp.status(200).json({
        success: true,
        reviews: product.reviews
    })

});

// Delete Review of the Products 

exports.deleteProductReview = catchAsyncErrors(async (req, resp, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErroHandler("Product Not Found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );


    let avg = 0;

    reviews.forEach(rev => {
        avg += rev.rating
    })


    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    )

    resp.status(200).json({
        success: true,
        message: "Review deleted successfully"
    })

});