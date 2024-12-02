const express = require('express');
const controller = require('../controllers/user');
const LoginUser = require('../middleware/loginmiddleware');


const router = express.Router();  

router.route('/').get(controller.showusers)
router.route('/').post(controller.createusers);


router.route('/').delete(controller.deleteuser)
router.route('/').put(controller.updateuser);

router.route('/login').post(LoginUser);

module.exports = router;
