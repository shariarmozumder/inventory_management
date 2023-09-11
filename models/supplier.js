const mongoose = require("mongoose")
const validator = require("validator")
const {objectId} = mongoose.Schema.Types

const supplierSchema = mongoose.Schema({

  name: {
    type: String,
    trim: true,
    required: [true, "Please provide a name"],
    lowercase: true,
    minLength: [3, "name must at least 3 character"],
    maxLength: [100, "name is too large"]
  },

  email: {
    type: String,
    trim: true,
    validate: [validator.isEmail, "please provide a valid email"],
    lowercase: true,
    unique: true
  },

  brand: {
    name: {
      type: String,
      trim: true,
      require: true
    },
    id: {
      type: objectId,
      required: true,
      ref: "brand"
    }
  },

  contactNumber: {
    type: String,
    required: [true, "Please provide a contact number"],
    validate: {
      validator: (value)=>{
        return validator.isMobilePhone(value)
      },
      message: "please provide a valid phone number"
    }
  },

  emergencyContactNumber: {
    type: String,
    required: [true, "please provide a emergency contact number"],
    validate: {
      validator: (value)=>{
        return validator.isMobilePhone(value)
      },
      message: "Please provide a valid emergency phone number"
    }
  },

  presentAddress: {
    type: String,
    required: [true, "please provide your present address"]
  },

  permanentAddress: {
    type: String,
    required: [true, "please provide your permanent address"]
  },

  location: {
    type: String,
    required: true,
    lowercase: true,
    enum: {
      values: [
        "Dhaka",
        "Khulna",
        "Rajshahi",
        "Rangpur",
        "Mymensingh",
        "Sylhet",
        "Barishal",
        "Chattogram"
      ],
      message: "{VALUES} is not a correct location!"
    }
  },

  imageUrl: {
    type: String,
    validate: [validator.isURL, "please provide a valid url"]
  },

  nationalIdImageUrl: {
    type: String,
    required: true,
    validate: [validator.isURL, "Please provide a valid url"]
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }


},{
  timestamps: true, versionKey: false
});

const supplier = mongoose.model('supplier', supplierSchema)
module.exports = supplier;

