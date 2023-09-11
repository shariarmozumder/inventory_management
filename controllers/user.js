const {signUpService} = require("../services/user")
exports.signup= async (req, res)=>{
  try {

    const user = await signUpService(req.body);
    await user.save({validateBeforeSave: false});

    res.status(200).json({
      status: "Success",
      message: "Successfully signed up"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      message: error.message
    })
  }
}