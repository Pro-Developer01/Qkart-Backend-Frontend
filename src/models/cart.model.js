const mongoose = require('mongoose');
const { productSchema } = require('./product.model');
const config = require("../config/config")
const validator = require("validator");

// TODO: CRIO_TASK_MODULE_CART - Complete cartSchema, a Mongoose schema for "carts" collection
const cartSchema = mongoose.Schema(
  {
    email:{
      type:String,
      require:true,
      unique:true,
      lowercase: true,
      validate:value=>validator.isEmail(value)
    },
    cartItems:[{
      product:productSchema,
      quantity:{type:Number}
    }],
    paymentOption:{type:String,
      default:config.default_payment_option
    }
  },
  {
    timestamps: false,
  }
);

cartSchema.statics.isCartAvailable=async function(email){
  const cart=await this.findOne({email});
  return cart;
}

/**
 * @typedef Cart
 */
const Cart = mongoose.model('Cart', cartSchema);

module.exports.Cart = Cart;