const express = require("express");
const { verifyUser, verifyAdmin } = require("../middleware/verifyuser");
const controllers = require("../controllers/todotask");

const router = express.Router();

router.route("/task").post(verifyAdmin, controllers.taskDo);
router.route("/priority").put(verifyUser, controllers.taskPriority);
router.route("/status").post(verifyAdmin, controllers.taskStatus);
router
  .route("/tasksearch")
  .post(verifyAdmin, verifyUser, controllers.taskSearch);
router.route("/seetask").get(verifyAdmin, verifyUser, controllers.seeTask);

module.exports = router;
