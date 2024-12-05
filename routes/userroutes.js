const express = require("express");
const controller = require("../controllers/user");
const { verifyUser, verifyAdmin } = require("../middleware/verifyuser");
const { preventSelfDeletion } = require("../middleware/preventselfdeletion");

const router = express.Router();

router.route("/users").get(verifyUser, controller.showusers);
router.route("/create").post(controller.createusers);
router
  .route("/delete")
  .delete(verifyAdmin, preventSelfDeletion, controller.deleteuser);
router.route("/update").put(verifyUser, controller.updateuser);

module.exports = router;
