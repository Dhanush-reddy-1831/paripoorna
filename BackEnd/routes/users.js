const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");

router.get("/users", userController.getAlldetails);
router.post("/addusers", userController.addUser);
router.put('/editUser/:_id', userController.editUser)
router.delete("/deleteusers/:_id", userController.deleteUser);
module.exports = router;
