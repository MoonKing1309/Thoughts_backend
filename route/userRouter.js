const express = require("express")
const router = express.Router()

const {
    userLogin,
    userSignup,
    userPosts

} = require("../controller/userController.js")

router.route('/login').post(userLogin)
router.route('/signup').post(userSignup)
router.route('/history/:id').get(userPosts)

module.exports = router;
