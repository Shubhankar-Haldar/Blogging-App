const router = require("express").Router();
const UserController = require("../controller/user");

// update
router.put("/:id", UserController.update);

// delete
router.delete("/:id", UserController.delete);

// get by id
router.get("/:id", UserController.getById);

module.exports = router;
