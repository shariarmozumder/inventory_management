const mongoose = require('mongoose')
const validator = require('validator')
const crypto = require('crypto')
const bcrypt = require('bcryptjs');
const { stringify } = require('querystring');


const userSchema = mongoose.Schema({

  email: {
    type: String,
    validate: [validator.isEmail, "Please Provide a valid email"],
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email address is required"]
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: (value)=>
        validator.isStrongPassword(value, {
          minLength: 6,
          minLowercase: 3,
          minNumber: 1,
          minUppercase: 1,
          minSymbols: 1
        }),
       message: "password {VALUE} is not strong enough"
    }
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function(value){
        return value === this.password
      },
      message: "password don't match!"
    }
  },

  role: {
    type: String,
    enum: ['buyer', 'store-manager', 'admin'],
    default: 'buyer'
  },

  firstName: {
    type: String,
    required: [true, "Please provide your first name"],
    trim: true,
    minLength: [3, "Name must be at least 3 character"],
    maxLength: [100, "Name is too large"]
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name"],
    trim: true,
    minLength: [3, "Name must be at least 3 character"],
    maxLength: [100, "Name is too large"]
  },

  contactNumber: {
    type: String,
    validate: [validator.isMobilePhone, "Please provide a valid contact number"]
  },

  shippingAddress: String,

  imageURL: {
    type: String,
    validate: [validator.isURL, "please provide a valid Url"]
  },

  status: {
    type: String,
    enum: ['active', 'inactive', 'blocked'],
    default: 'inactive'
  },

  confirmationToken: String,
  confirmationTokenExpires: Date,

  passwordChangedAt: Date,
  passwordRecentToken: String,
  passwordResetExpires: Date,


},{
  timestamps: true,
  versionKey: false
});


userSchema.pre("save", function(next){
  if(!this.isModified("password")){
    return next
  }

  const password = this.password;
  const hashPassword = bcrypt.hashSync(password)

  this.password = hashPassword
  this.confirmPassword = undefined;

  next();
});


userSchema.methods.comparePassword = function(password, hash){
  const isValidPassword = bcrypt.compareSync(password, hash)
  return isValidPassword;
};


userSchema.methods.generateConfirmationToken = function(){
  const token = crypto.randomBytes(32).toString("hex")

  this.confirmationToken = token;

  const date = new Date()

  date.setDate(date.getDate() +1)
  this.confirmationTokenExpires = date;

  return token;
}


const User = mongoose.model('User', userSchema)
module.exports = User;