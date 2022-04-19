const router = require("express").Router();
const CatController = require("../controller/category");

// post
router.post("/", CatController.addCat);

// get
router.get("/", CatController.getCat);

module.exports = router;
