const express=require('express');
const { getall, createController, updateController, singleelementController, deletController, userBlogControlller } = require('../controllers/blogController');
//const { route } = require('./userRoutes');
// router object
const router=express.Router();
// router get all data
router.get('/all-get',getall)
//create || POST
router.post('/create',createController)
// update || 
router.put('/update/:id',updateController)
// single element
router.get('/get-blog/:id',singleelementController)
// delet
router.delete('/delet/:id',deletController)
//GET || user blog
router.get("/user-blog/:id", userBlogControlller);
module.exports=router