const mongoose = require("mongoose")
const validate = require("validator")

const categorySchema = mongoose.Schema({

  name: {
    type: String,
    trim: true,
    require: [true, "please provide a category name"],
    lowercase: true,
    unique: true
  },

  description: String,
  
  imageUrl: {
    type: String,
    required: true,
    validate: [validate.isURL, "please provide a valid Url"]
  }

},{
  timestamps:true, versionKey:false
})

const category = mongoose.model("category", categorySchema)
module.exports=category