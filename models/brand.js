const mongoose = require("mongoose")
const validator = require("validator")
const {objectId} = mongoose.Schema.Types;


const brandSchema = mongoose.Schema({

  products: [{
    type: objectId,
    ref: "product"
  }],

  name: {
    type: String,
    trim: true,
    required: [true, "Please provide a brand name"],
    maxLength: 100,
    lowercase: true,
    unique: true
  },
  description: String,

  email: {
    type: String,
    validate: [validator.isEmail, "please provide a valid email"],
    lowercase: true
  },

  website: {
    type: String,
    validate: [validator.isURL, "Please provide a valid Url"]
  },
  location: String,

  suppliers: [{
    name: String,
    contactNumber: String,
    id: {
      type: objectId,
      ref: "supplier"
    }
  }],

  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  }

},{
  timestamps: true, versionKey: false
})

const brand = mongoose.model("brand", brandSchema)

module.exports=brand;