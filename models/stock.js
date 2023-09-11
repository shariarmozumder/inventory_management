const mongoose = require('mongoose')
const validate = require('validator')
const {objectId} = mongoose.Schema.Types;

const stockSchema = mongoose.Schema({

  productId: {
    type: objectId,
    ref: 'product',
    required: true
  },
  
  name: {
    type: String,
    require: [true, "Please provide a name for this product"],
    trim: true,
    lowercase: true,
    minLength: [3, "Name must be at least 3 Character"],
    maxLength: [100, "Name is too large"]
  },

  description: {
    type: String,
    required: true
  },

  unit: {
    type: String,
    required: true,
    enum: {
      values: ['kg', 'litter', 'pcs', 'bag'],
      message: "Unit can't be {VALUE}, must be kg/litter/pcs/bag"
    }
  },

  imageURL: [{
    type: String,
    required: true,
    validate: [validator.isURL, "please provide valid url"]
  }],

  price: {
    type: number,
    required: true,
    min: [0, "Product Price can't be negative"]
  },

  quantity: {
    type: number,
    required: true,
    min: [0, "Product quantity can't be negative"]
  },

  category: {
    type: String,
    required: true
  },

  brand: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: objectId,
      ref: "brand",
      required: true
    }
  },

  status: {
    type: String,
    required: true,
    enum: {
      values: ['in-stock', 'out-of-stock', 'discontinued'],
      message: "status can't be {VALUE}"
    }
  },

  store: {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a store name"],
      lowercase: true,
      enum: {
        values: ["Dhaka", "Khulna", "Rajshahi", "Rangpur", "Mymensingh", "Sylhet", "Barishal", "Chattogram"],
        message: "{VALUE} is not a valid name",
     }
    },
    id: {
      type: objectId,
      required: true,
      ref: "store"
    }
  },

  suppliedBy: {
    name: {
      type: String,
      trim: true,
      required: true
    },
    id: {
      type: objectId,
      ref: "supplier"
    }
  },

  sellCount: {
    type: number,
    default: 0,
    min: 0
  } 

},{
  timestamps: true, versionKey: false
})

const stock = mongoose.model('stock', stockSchema)
module.exports = stock;