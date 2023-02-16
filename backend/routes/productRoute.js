const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteProductReview, getAdminProducts } = require('../controllers/productController');
const { isAuthenticatedUser ,authorizationRoles} = require('../middleWare/auth');

const router = express.Router();

router.route('/products').get(getAllProducts);

router.route('/admin/products').get(isAuthenticatedUser,authorizationRoles("admin"), getAdminProducts);

router.route('/admin/products/new').post(isAuthenticatedUser,authorizationRoles("admin"), createProduct);

router.route('/admin/products/:id').put(isAuthenticatedUser,authorizationRoles("admin"), updateProduct);

router.route('/admin/products/:id').delete(isAuthenticatedUser,authorizationRoles("admin"), deleteProduct);

router.route('/product/:id').get(getProductDetails);

router.route('/review').put(isAuthenticatedUser,createProductReview);

router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser,deleteProductReview);

// router.route('/review/).put(isAuthenticatedUser,getProductReviews);

module.exports = router;