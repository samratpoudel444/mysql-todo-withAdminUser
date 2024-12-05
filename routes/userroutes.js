const express = require('express');
const controller = require('../controllers/user');
const { LoginUser, logOutUser } = require('../controllers/auth');
const verifyUser = require('../middleware/verifyuser');
const { verifyAdmin } = require('../middleware/adminverify');
const { preventSelfDeletion } = require('../middleware/preventselfdeletion');


const router = express.Router();  

router.route('/users').get(verifyUser,controller.showusers)
router.route('/create').post( controller.createusers)
router.route('/delete').delete(verifyAdmin,preventSelfDeletion, controller.deleteuser)
router.route('/update').put(verifyUser, controller.updateuser);


router.route('/login').post(LoginUser);
router.route('/logout').delete(logOutUser);



module.exports = router;
