const express = require('express');
const verifyUser = require('../middleware/verifyuser');
const controllers = require('../controllers/todotask');
const { verifyAdmin } = require('../middleware/adminverify');

const router = express.Router();  

router.route('/task').post(verifyAdmin, controllers.taskDo);
router.route('/priority').put(verifyUser, controllers.taskPriority)
router.route('/status').post(verifyAdmin, controllers.taskStatus)


module.exports= router;