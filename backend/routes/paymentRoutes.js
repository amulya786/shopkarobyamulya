const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentControllers");
const { isAuthenticatedUser } = require("../middleWare/auth");
const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser,processPayment);
router.route("/stripeApiKey").get(isAuthenticatedUser,sendStripeApiKey);
module.exports = router;