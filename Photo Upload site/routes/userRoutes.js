const express=require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/userController');

// router object
const router=express.Router()
// create route
router.get('/all-users',getAllUsers)
// register | Post
router.post('/register',registerController)
// login || post
router.post('/login',loginController);
module.exports=router;