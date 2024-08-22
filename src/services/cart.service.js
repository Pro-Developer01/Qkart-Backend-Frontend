const httpStatus = require("http-status");
const { Cart, Product } = require("../models");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");

// TODO: CRIO_TASK_MODULE_CART - Implement the Cart service methods

/**
 * Fetches cart for a user
 * - Fetch user's cart from Mongo
 * - If cart doesn't exist, throw ApiError
 * --- status code  - 404 NOT FOUND
 * --- message - "User does not have a cart"
 *
 * @param {User} user
 * @returns {Promise<Cart>}
 * @throws {ApiError}
 */
const getCartByUser = async (user) => {
  const cart = await Cart.findOne({ email: user.email });
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not have a cart");
  }

  return cart;
};

// const getCartByUser = async function (user) {
//   const cartData = await Cart.isCartAvailable(user.email);
//   if (!cartData) {
//     // throw new ApiError(httpStatus.NOT_FOUND, "User does not have a cart");
//     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"500 Internal Server Error")

//   }
//   return cartData;
// };

/**
 * Adds a new product to cart
 * - Get user's cart object using "Cart" model's findOne() method
 * --- If it doesn't exist, create one
 * --- If cart creation fails, throw ApiError with "500 Internal Server Error" status code
 *
 * - If product to add already in user's cart, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product already in cart. Use the cart sidebar to update or remove product from cart"
 *
 * - If product to add not in "products" collection in MongoDB, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product doesn't exist in database"
 *
 * - Otherwise, add product to user's cart
 *
 *
 *
 * @param {User} user
 * @param {string} productId
 * @param {number} quantity
 * @returns {Promise<Cart>}
 * @throws {ApiError}
 */
const addProductToCart = async (user, productId, quantity) => {
  const productDetails = await Product.findOne({ _id: productId });

  //this works
  if (!productDetails) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Product doesn't exist in database"
    );
  }

  const cartDetailsByEmail = await Cart.findOne({ email: user.email });

  //new record created -works
  if (!cartDetailsByEmail) {
    const firstCartCreated = await Cart.create({
      email: user.email,
      cartItems: [{ product: productDetails, quantity: quantity }],
      paymentOption: config.default_payment_option,
    });
    if (!firstCartCreated) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "500 Internal Server Error"
      );
    }
    return firstCartCreated;
  }

  const productExist = cartDetailsByEmail.cartItems.filter((element) => {
    {
      return String(element.product._id) === productId;
    }
  });

  // console.log(productExist);
  // console.log("cartDetailsByEmail",cartDetailsByEmail.cartItems);
  //this product exits works
  if (productExist.length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Product already in cart. Use the cart sidebar to update or remove product from cart"
    );
  } else {
    cartDetailsByEmail.cartItems.push({
      product: productDetails,
      quantity: quantity,
    });
    const addProductToExistingCart = await cartDetailsByEmail.save();
    return addProductToExistingCart;
  }
};

// const addProductToCart = async (user, productId, quantity) => {
//   const productData = await Product.findOne({ _id: productId });
//   const cartData = await Cart.isCartAvailable(user.email);
//   if (!productData) {
//     throw new ApiError(
//       httpStatus.BAD_REQUEST,
//       "Product doesn't exist in database"
//     );
//   }
//   if (!cartData) {
//     try {const payload = {
//       email: user.email,
//       cartItems: [
//         {
//           product: productData,
//           quantity: quantity,
//         },
//       ],
//       paymentOption: config.default_payment_option,
//     };
//     const createdCart= await Cart.create(payload)
//     return createdCart
//   }catch (err)
//   {
//     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"500 Internal Server Error")
//   }
// }

//     // Have to check whether product is already added in the card or not
//   const isProductPresentInCart=JSON.stringify(cartData).includes(productId)
//   if(isProductPresentInCart)
//   {
//     throw new ApiError(httpStatus.BAD_REQUEST,"Product already in cart. Use the cart sidebar to update or remove product from cart")
//   }

//   // if all good then adding product to cart
//   cartData.cartItems.push({
//     product: productData,
//     quantity: quantity,
//   })
//   const updatedCart=await cartData.save()
// return updatedCart

// };

/**
 * Updates the quantity of an already existing product in cart
 * - Get user's cart object using "Cart" model's findOne() method
 * - If cart doesn't exist, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "User does not have a cart. Use POST to create cart and add a product"
 *
 * - If product to add not in "products" collection in MongoDB, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product doesn't exist in database"
 *
 * - If product to update not in user's cart, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product not in cart"
 *
 * - Otherwise, update the product's quantity in user's cart to the new quantity provided and return the cart object
 *
 *
 * @param {User} user
 * @param {string} productId
 * @param {number} quantity
 * @returns {Promise<Cart>
 * @throws {ApiError}
 */
const updateProductInCart = async (user, productId, quantity) => {
  const productData = await Product.findOne({ _id: productId });
  const cartData = await Cart.isCartAvailable(user.email);
  if (!productData) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Product doesn't exist in database"
    );
  }
  if (!cartData) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User does not have a cart. Use POST to create cart and add a product"
    );
  }
  const isProductPresentInCart = JSON.stringify(cartData).includes(productId);
  if (!isProductPresentInCart) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product not in cart");
  }
  const cartItemToUpdate = cartData.cartItems.find(
    (item) => item.product._id.toString() === productId
  );
  cartItemToUpdate.quantity = quantity;
  const updatedCart = await cartData.save();
  return updatedCart;
};

/**
 * Deletes an already existing product in cart
 * - If cart doesn't exist for user, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "User does not have a cart"
 *
 * - If product to update not in user's cart, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product not in cart"
 *
 * Otherwise, remove the product from user's cart
 *
 *
 * @param {User} user
 * @param {string} productId
 * @throws {ApiError}
 */
const deleteProductFromCart = async (user, productId) => {
  const cartData = await Cart.isCartAvailable(user.email);
  if (!cartData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does not have a cart.");
  }
  const isProductPresentInCart = JSON.stringify(cartData).includes(productId);
  if (!isProductPresentInCart) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product not in cart");
  }
  cartData.cartItems = cartData.cartItems.filter(
    (item) => item.product._id.toString() !== productId
  );
  const updatedCart = await cartData.save();
  console.log({ updatedCart });
  return updatedCart;
};

// TODO: CRIO_TASK_MODULE_TEST - Implement checkout function
/**
 * Checkout a users cart.
 * On success, users cart must have no products.
 *
 * @param {User} user
 * @returns {Promise}
 * @throws {ApiError} when cart is invalid
 */
const checkout = async (user) => {
  const cart = await Cart.findOne({ email: user.email });
  if (cart == null)
    throw new ApiError(httpStatus.NOT_FOUND, "User does not have a cart");
  if (!cart.cartItems.length)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User does not have items in the cart"
    );
  const hasSetNonDefaultAddress = await user.hasSetNonDefaultAddress();
  if (!hasSetNonDefaultAddress)
    throw new ApiError(httpStatus.BAD_REQUEST, "Address not set");
  const total = cart.cartItems.reduce((acc, item) => {
    acc = acc + item.product.cost * item.quantity;
    return acc;
  }, 0);
  if (total > user.walletMoney)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User does not have sufficient balance"
    );
  user.walletMoney -= total;
  await user.save();
  cart.cartItems = [];
  await cart.save();
};

module.exports = {
  getCartByUser,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  checkout,
};
