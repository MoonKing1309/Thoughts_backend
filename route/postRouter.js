const express = require("express")
const router = express.Router()

const {
   postCreate,
   postEdit,
   postFetch,
   postDelete,
   postsFetch,
   lastThreePosts

} = require("../controller/postController.js")

router.route('/history/:year/:month/:userID').get(postsFetch)
router.route('/history/:postID').post(postFetch)
router.route('/create').post(postCreate)
router.route('/edit/:postID').put(postEdit)
router.route('/edit/:postID').delete(postDelete)
router.route('/home/:userID').get(lastThreePosts)



module.exports = router;
