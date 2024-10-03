const userModel=require('../models/userModel')
const bcrypt = require("bcrypt");
exports.getAllUsers=async(req,res)=>{
try {
    const users=await userModel.find({})
    return res.status(200)
    .send({
        usercount:users.length,
        success:true,
        message:"Get All User Successfully",
        users,
    });
} catch (error) {
    console.log(error)
    res.status(500)
    .send({
        success:false,
        message:"Error In GetUser",
        error,
    });
}


}
// register
exports.registerController=async(req,res)=>{
try {
    const {username,email, password}=req.body;
    if(!username || !email || !password){
      return res.status(401).send({
        success:false,
        message:"Fill Up The Blank Space"
      })
    }
    // checck
    const existinguser=await userModel.findOne({email});
    if(existinguser){
        return res.status(301).send({
            success:false,
            message:"Already Register Please Login"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    //save new user
    const user = new userModel({ username, email, password:hashedPassword});
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Errorr IN Register"
    })
}


}
exports.loginController=async(req,res)=>{
try {
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(301)
        .send({
            success:false,
            message:"Fill Up The Blank Space",
        })
    }
    // check user
    const user=await userModel.findOne({email})
    if(!user){
        return res.status(201)
        .send({
            success:false,
            message:"Email Not Register"
        })
    }
     //password
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
       return res.status(401).send({
         success: false,
         message: "Invlid username or password",
       });
     }
     return res.status(200).send({
       success: true,
       messgae: "login successfully",
       user,
     });
} catch (error) {
    console.log(error)
    res.status(500)
    .send({
        success:false,
        message:"Error In Login",
        error,
    });
}


}