const router = require("express").Router();
const PostController = require("../controller/post");

// create
router.post("/", PostController.post);

// update
router.put("/:id", PostController.update);

// delete
router.delete("/:id", PostController.delete);

// get post
router.get("/:id", PostController.getPost);

// get all posts
router.get("/", PostController.getAllPosts);

module.exports = router;
