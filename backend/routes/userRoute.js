const express = require("express");
const { registerUser, loginUser, logout, forgetPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUser, getSingleUser, updateUserRoleByAdmin, deleteUserRoleByAdmin } = require("../controllers/userController");
const { isAuthenticatedUser, authorizationRoles } = require('../middleWare/auth');

const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgetPassword);// we have to work on this 
router.route("/password/reset/:token").put(resetPassword);// we have to work on this 
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizationRoles("admin"), getAllUser)
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizationRoles("admin"), getSingleUser).put(isAuthenticatedUser, authorizationRoles("admin"), updateUserRoleByAdmin)
.delete(isAuthenticatedUser, authorizationRoles("admin"), deleteUserRoleByAdmin)



module.exports = router;