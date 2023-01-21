// import {
//   AddOutlined,
//   RemoveOutlined,
//   ShoppingCart,
//   ShoppingCartOutlined,
// } from "@mui/icons-material";
// import { Button, IconButton, Stack } from "@mui/material";
// import { Box } from "@mui/system";
// import React from "react";
// import { useHistory } from "react-router-dom";
// import "./Cart.css";

// // Definition of Data Structures used
// /**
//  * @typedef {Object} Product - Data on product available to buy
//  *
//  * @property {string} name - The name or title of the product
//  * @property {string} category - The category that the product belongs to
//  * @property {number} cost - The price to buy the product
//  * @property {number} rating - The aggregate rating of the product (integer out of five)
//  * @property {string} image - Contains URL for the product image
//  * @property {string} _id - Unique ID for the product
//  */

// /**
//  * @typedef {Object} CartItem -  - Data on product added to cart
//  *
//  * @property {string} name - The name or title of the product in cart
//  * @property {string} qty - The quantity of product added to cart
//  * @property {string} category - The category that the product belongs to
//  * @property {number} cost - The price to buy the product
//  * @property {number} rating - The aggregate rating of the product (integer out of five)
//  * @property {string} image - Contains URL for the product image
//  * @property {string} productId - Unique ID for the product
//  */

// /**
//  * Returns the complete data on all products in cartData by searching in productsData
//  *
//  * @param { Array.<{ productId: String, qty: Number }> } cartData
//  *    Array of objects with productId and quantity of products in cart
//  *
//  * @param { Array.<Product> } productsData
//  *    Array of objects with complete data on all available products
//  *
//  * @returns { Array.<CartItem> }
//  *    Array of objects with complete data on products in cart
//  *
//  */
// export const generateCartItemsFrom = (cartData, productsData) => {
//   const completeInfo = [];
//   if (cartData.length && productsData.length) {
//     cartData.forEach((item) => {
//       productsData.forEach((prodct) => {
//         if (item.productId === prodct._id) {
//           prodct={...prodct,qty:item.qty}
//           completeInfo.push(prodct);
//         }
//       });
//     });

//     return completeInfo;
//   }
// };

// /**
//  * Get the total value of all products added to the cart
//  *
//  * @param { Array.<CartItem> } items
//  *    Array of objects with complete data on products added to the cart
//  *
//  * @returns { Number }
//  *    Value of all items in the cart
//  *
//  */
// export const getTotalCartValue = (items) => {
// let costx=0
// items.forEach((item)=>{
//   costx+=item.cost*item.qty;
// })
// return costx;
// };

// /**
//  * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
//  *
//  * @param {Number} value
//  *    Current quantity of product in cart
//  *
//  * @param {Function} handleAdd
//  *    Handler function which adds 1 more of a product to cart
//  *
//  * @param {Function} handleDelete
//  *    Handler function which reduces the quantity of a product in cart by 1
//  *
//  *
//  */
// const ItemQuantity = ({ value, handleAdd, handleDelete }) => {
//   return (
//     <Stack direction="row" alignItems="center">
//       <IconButton size="small" color="primary" onClick={handleDelete}>
//         <RemoveOutlined />
//       </IconButton>
//       <Box padding="0.5rem" data-testid="item-qty">
//         {value}
//       </Box>
//       <IconButton size="small" color="primary" onClick={handleAdd}>
//         <AddOutlined />
//       </IconButton>
//     </Stack>
//   );
// };

// /**
//  * Component to display the Cart view
//  *
//  * @param { Array.<Product> } products
//  *    Array of objects with complete data of all available products
//  *
//  * @param { Array.<Product> } items
//  *    Array of objects with complete data on products in cart
//  *
//  * @param {Function} handleDelete
//  *    Current quantity of product in cart
//  *
//  *
//  */
// const Cart = ({ products, items = [], handleQuantity }) => {
// const history=useHistory();
//   const handleDelete=(id,qty)=>{
//     qty>0?
//     handleQuantity(id,qty-0-1): handleQuantity(id,0)
//   }
//   const handleAdd=(id,qty)=>{
//     handleQuantity(id,qty-0+1)
//   }
//   if (!products?.length) {
//     return (
//       <Box className="cart empty">
//         <ShoppingCartOutlined className="empty-cart-icon" />
//         <Box color="#aaa" textAlign="center">
//           Cart is empty. Add more items to the cart to checkout.
//         </Box>
//       </Box>
//     );
//   }

//   return (
//     <>
//       <Box className="cart">
//         {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}

//         {products?.map((item) => {
//           return (
//             <Box
//               display="flex"
//               alignItems="flex-start"
//               padding="1rem"
//               key={item._id}
//             >
//               <Box className="image-container">
//                 <img
//                   // Add product image
//                   src={item.image}
//                   // Add product name as alt eext
//                   alt={item.name}
//                   width="100%"
//                   height="100%"
//                 />
//               </Box>
//               <Box
//                 display="flex"
//                 flexDirection="column"
//                 justifyContent="space-between"
//                 height="6rem"
//                 paddingX="1rem"
//               >
//                 <div>{item.name}</div>
//                 <Box
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <ItemQuantity value={item.qty}  handleDelete={()=>handleDelete(item._id,item.qty)} handleAdd={()=>handleAdd(item._id,item.qty)}  />
//                   <Box padding="0.5rem" fontWeight="700">
//                     ${item.cost}
//                   </Box>
//                 </Box>
//               </Box>
//             </Box>
//           );
//         })}
//         <Box
//           padding="1rem"
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <Box color="#3C3C3C" alignSelf="center">
//             Order total
//           </Box>
//           <Box
//             color="#3C3C3C"
//             fontWeight="700"
//             fontSize="1.5rem"
//             alignSelf="center"
//             data-testid="cart-total"
//           >
//             ${getTotalCartValue(products)}
//           </Box>
//         </Box>

//         <Box display="flex" justifyContent="flex-end" className="cart-footer">
//           <Button
//             color="primary"
//             variant="contained"
//             startIcon={<ShoppingCart />}
//             className="checkout-btn"
//             onClick={()=>{history.push('/checkout')}}
            
//           >
//             Checkout
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Cart;



import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack,Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 *
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 *
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  console.log(cartData, productsData);
  const productIds = cartData.map((item) => {
    return item.productId;
  });
  const filteredProducts = productsData.filter((item) => {
    return productIds.includes(item._id);
  });
  const cartItem = filteredProducts.map((ele, idx) => {
    return {
      name: ele.name,
      qty: cartData[idx].qty,
      category: ele.category,
      cost: ele.cost,
      rating: ele.rating,
      image: ele.image,
      productId: ele._id,
    };
  });
  // console.log(cartItem)
  return cartItem;
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  const totalValue = items.reduce((sum, item) => {
    return sum + item.cost * item.qty;
  }, 0);
  return totalValue;
};

export const getTotalItems = (items = []) => {
  const totalQty = items.reduce((sum, ele) => {
    return sum + ele.qty;
  }, 0);
  return totalQty;
};
/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 *
 * @param {Number} value
 *    Current quantity of product in cart
 *
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 *
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 *
 *
 */
const ItemQuantity = ({ value, handleAdd, handleDelete }) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

/**
 * Component to display the Cart view
 *
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 *
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 *
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 *
 *
 */
function Cart({ products, items = [], handleQuantity, isReadOnly = false }) {
  const history = useHistory();
  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }
  

  // return (
  //   <>
  //     <Box className="cart">
  //       {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
  //       {items.map((ele) => {
  //         return (
  //           <Box display="flex" alignItems="flex-start" padding="1rem">
  //             <Box className="image-container">
  //               <img
  //                 // Add product image
  //                 src={ele.image}
  //                 // Add product name as alt eext
  //                 alt={ele.name}
  //                 width="100%"
  //                 height="100%"
  //               />
  //             </Box>
  //             <Box
  //               display="flex"
  //               flexDirection="column"
  //               justifyContent="space-between"
  //               height="6rem"
  //               paddingX="1rem"
  //             >
  //               <div>{ele.name}</div>
  //               <Box
  //                 display="flex"
  //                 justifyContent="space-between"
  //                 alignItems="center"
  //               >
  //                 <ItemQuantity
  //                 // Add required props by checking implementation
  //                 value={ele.qty}
  //                 handleAdd={() => {
  //                 handleQuantity(
  //                   localStorage.getItem("token"),
  //                   items,
  //                   products,
  //                   ele.productId,
  //                   ele.qty + 1
  //                 );
  //               }}
  //               handleDelete={() => {
  //                 handleQuantity(
  //                   localStorage.getItem("token"),
  //                   items,
  //                   products,
  //                   ele.productId,
  //                   ele.qty - 1
  //                 );}}
  //                 />
  //                 <Box padding="0.5rem" fontWeight="700">
  //                   ${ele.cost}
  //                 </Box>
  //               </Box>
  //             </Box>
  //           </Box>
  //         );
  //       })}
  //       <Box
  //         padding="1rem"
  //         display="flex"
  //         justifyContent="space-between"
  //         alignItems="center"
  //       >
  //         <Box color="#3C3C3C" alignSelf="center">
  //           Order total
  //         </Box>
  //         <Box
  //           color="#3C3C3C"
  //           fontWeight="700"
  //           fontSize="1.5rem"
  //           alignSelf="center"
  //           data-testid="cart-total"
  //         >
  //           ${getTotalCartValue(items)}
  //         </Box>
  //       </Box>
  //       <Box display="flex" justifyContent="flex-end" className="cart-footer">
  //         <Button
  //           color="primary"
  //           variant="contained"
  //           startIcon={<ShoppingCart />}
  //           className="checkout-btn"
  //           onClick={(e) => history.push("/checkout")}
  //         >
  //           Checkout
  //         </Button>
  //       </Box>
  //     </Box>
  //   </>
  // );
  return (
    <>
      <Box className="cart" sx={{background: 'white'}}>
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        {items.map((ele) => {
          return (
            <Box
              display="flex"
              alignItems="flex-start"
              padding="1rem"
              key={ele.productId}
            >
              <Box className="image-container">
                <img
                  // Add product image
                  src={ele.image}
                  // Add product name as alt eext
                  alt={ele.name}
                  width="100%"
                  height="100%" />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="6rem"
                paddingX="1rem"
              >
                <div>{/* Add product name */ele.name}</div>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {!isReadOnly ? (
                    <ItemQuantity
                      value={ele.qty}
                      handleAdd={() => {
                        handleQuantity(
                          localStorage.getItem("token"),
                          items,
                          products,
                          ele.productId,
                          ele.qty + 1
                        );
                      } }
                      handleDelete={() => {
                        handleQuantity(
                          localStorage.getItem("token"),
                          items,
                          products,
                          ele.productId,
                          ele.qty - 1
                        );
                      } } />
                  ) : (
                    <Box padding="0.5rem" data-testid="item-qty">
                      Qty: {ele.qty}
                    </Box>
                  )}
                  <Box padding="0.5rem" fontWeight="700">
                    ${/* Add product cost */ele.cost}
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box>
        </Box>
        {!isReadOnly && (
          <Box display="flex" justifyContent="flex-end" className="cart-footer">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ShoppingCart />}
              className="checkout-btn"
              onClick={(e) => history.push("/checkout")}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Box>
      {isReadOnly && (
        <Box padding="1rem" className="cart"  sx={{background: 'white'}}>
          <Typography variant="h5" fontWeight="700" mb={2}>
            Order Details
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography> Products </Typography>
            <Typography>${getTotalItems(items)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Subtotal</Typography>
            <Typography>${getTotalCartValue(items)} </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography>Shipping Charges</Typography>
            <Typography>$0</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6" fontWeight="700">
              Total
            </Typography>
            <Typography variant="h6" fontWeight="700">
              ${getTotalCartValue(items) + 0}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Cart;
