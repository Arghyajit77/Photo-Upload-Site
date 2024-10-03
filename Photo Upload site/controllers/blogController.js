const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
// getall element
exports.getall=async(req,res)=>{
try {
    const blogs=await blogModel.find({}).populate("user");
    //The .populate() method is used to populate a field with data from another collection. In this case, it populates the user field. 
    //If your blogModel schema has a reference to a User model (via an ObjectId),
    // this line fetches the associated user data for each blog document.
    if(!blogs){
        return res.status(401)
        .send({
            success:false,
            message:"No Blogs Found"
        })
    }
    return res.status(200)
    .send({
        success:"true",
        blogCount:blogs.length,
        message:"Get All Element Successfully",
        blogs,
    });
} catch (error) {
    console.log(error)
    res.status(500)
    .send({
        success:false,
        message:"Error In Get Element",
    })
}
}
// create 
exports.createController=async(req,res)=>{
try {
    const {title,description,image,user}=req.body;
    if(!title || !description || !image || !user ){
        return res.status(301)
        .send({
            success:false,
            message:"Fill Up The Blank Space"
        })
    }
     const existinguser=await userModel.findById(user)
    if(!existinguser){
        return res.status(302)
        .send({
            success:false,
            message:"Unable To Find The user"
        })
    }
    const newBlog=new blogModel({title,description,image,user})
    const session=await mongoose.startSession();
    //mongoose.startSession():
//This line creates a new Mongoose session
//The startSession() method returns a session object that you can 
//use to start a transaction or group multiple database operations together.
session.startTransaction();
//Sessions are typically used with methods like withTransaction() to handle transactions.
await newBlog.save({session});
existinguser.blogs.push(newBlog);   
//The .push() method is used to add an element to the end of an array.
await existinguser.save({session});
await session.commitTransaction();
//Calling await session.commitTransaction() is like taking a final bow after a successful performance
await newBlog.save();
    return res.status(200).send({
     success:true,
     message:"Creation Successful",
     newBlog,
    });
} catch (error) {
    console.log(error)
    res.status(500)
    .send({
        success:false,
        message:"Error In Create Portion"
    })
}
}
// update
exports.updateController=async(req,res)=>{
    try {
        const { id } = req.params;
        const {title,description,image}=req.body;
        if(!title || !description){
            return res.status(301)
            .send({
                success:false,
                message:"Please Provide title and description"
            })
        }
        const blog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true});
        //new:true because it is a update button so we can passes third argument
        // The { new: true } option is often used in Mongoose (the MongoDB 
        //object modeling library for Node.js) when updating documents.
        // Let’s dive into it:
        return res.status(200)
        .send({
            success:true,
            message:"Update Successfully",
            blog,
        });
    } catch (error) {
        res.status(500)
        .send({
            success:false,
            message:"Error In Update",
            error
        })
    }
}
// single blog
exports.singleelementController=async(req,res)=>{
try {
    const {id}=req.params;
    const blog=await blogModel.findById(id);
    if(!blog){
     return res.status(402)
     .send({
        success:false,
        message:"Id is Not Match",
        blog,
     });
    }
    res.status(200)
    .send({
        success:true,
        message:"Successfully Get This Element"
    })
} catch (error) {
    console.log(error)
    res.status(500)
    .send({
        success:false,
        message:"Error In Single Element",
        error,
    });
}

}
exports.deletController=async(req,res)=>{
    try {
        /*const blogid=req.params.id;
        if(!blogid){
            return res.status(301)
            .send({
                success:false,
                message:"Provide The Id"
            })
        }
        const blog=await blogModel.findById(blogid)
        if(!blog){
            return res.status(303)
            .send({
                success:false,
                message:"No Photo IS Found In Id"
            })
        }
    await blogModel.findByIdAndDelete(blogid)
    return res.status(200)
    .send({
        success:true,
        message:"Delet The Data Successfully"
    })*/
        const blog = await blogModel
        // .findOneAndDelete(req.params.id)
        .findByIdAndDelete(req.params.id)
        .populate("user");
      await blog.user.blogs.pull(blog);
      await blog.user.save();
      return res.status(200).send({
        success: true,
        message: "Blog Deleted!",
      });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error In Delet"
        })
    }
}
// user blog
exports.userBlogControlller=async(req,res)=>{
    try {
        const UserBlog=await userModel.findById(req.params.id).populate("blogs");
        if(!UserBlog){
            return res.status(301)
            .send({
                success:false,
                message:"User Not Found In This ID",
                UserBlog
            })
        }
        return res.status(200).send({
            success: true,
            message: "user blogs",
            UserBlog,
          });
    } catch (error) {
        console.log(error)
        res.status(500)
        .send({
            success:false,
            message:"Error In UserBlog",
            error,
        });
    }
}
