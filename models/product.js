const mongoose = require("mongoose")
const validate = require("validator")
const {objectId} = mongoose.Schema.Types;

const productSchema = mongoose.Schema({

  name: {
    type: String,
    trim: true,
    required: [true, "Please provide a name for this product"],
    unique: [true, "name must be unique"],
    lowercase: true,
    minLength: [3, "Name must be at lest 3 characters"],
    maxLength: [100, "Name is too large"],
  },
  description: {
    type: String,
    required: true
  },

  unit: {
    type: String,
    required: true,
    enum: {
      values: ["kg", "litter", "pcs", "bag"],
      message: "Unit value can't be {VALUE}, must be kg/litter/pcs/bag"
    }
    
  },

  imageURL: {
    type: String,
    required: true,
    validate: [validate.isURL, "Wrong Url"]
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
      required: true,
      ref: "brand"
    }
  }


},{
  timestamps: true, versionKey: false
});

productSchema.pre('save', function(next){
  console.log('before saving data');
  
})

const product = mongoose.model("product", productSchema)
module.exports = product