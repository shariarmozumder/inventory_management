const User = require("../models/user");

exports.signUpService = async(uerInfo)=>{
  const user = await User.create(uerInfo);
  return user;
}