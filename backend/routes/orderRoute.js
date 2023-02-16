const express = require('express');
const { newOrder, getSingleOrder, myOrder, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();
const { isAuthenticatedUser ,authorizationRoles} = require('../middleWare/auth');


router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser,myOrder);
router.route('/admin/orders').get(isAuthenticatedUser,authorizationRoles("admin"),getAllOrders);
router.route('/admin/order/:id').put(isAuthenticatedUser,authorizationRoles("admin"),updateOrder)
.delete(isAuthenticatedUser,authorizationRoles("admin"),deleteOrder);

module.exports = router;
