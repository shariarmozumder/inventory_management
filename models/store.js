const mongoose = require('mongoose')
const validator = require('validator')
const {objectId} = mongoose.Schema.Types;

const storeSchema = mongoose.Schema({

  name: {
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
      message: "{VALUES} is not correct division"
    }
  },

  description: {
    type: String
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },

  manager: {
    type: String,
    contactNumber: String,
    id: {
      type: objectId,
      ref: "user"
    }
  }


},{
  timestamps: true, versionKey: false
});

const store = mongoose.model('store', storeSchema)
module.exports = store;