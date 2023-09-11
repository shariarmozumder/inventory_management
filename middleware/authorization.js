var { expressjwt: jwt } = require("express-jwt");
const User = require("../models/user");
require("dotenv").config();

exports.requireSignIn = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
});

exports.isAdmin = async (req, res, next)=>{
  console.log("Auth Test", req.auth)
  try{
    const user = await User.findById(req.auth._id)
    if(user.role !== "admin"){
      return res.status(403).json({
        status: "fail",
        message: "Unauthorized admin recourse"
      });
    }else{
      next();
    }
  }catch(err){
    console.log(err)
  }
};


exports.isManager = async (req, res, next)=>{
  console.log("auth test", req.auth)
  try {
    const user = await User.findById(req.auth._id)
    if(user.role !== "manager"){
      return res.status(403).json({
        status: "fail",
        message: "Unauthorized manager recourse"
      })
    }else{
      next();
    }
  } catch (error) {
    console.log(error)
  }
}
