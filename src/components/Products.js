// // import { Search, SentimentDissatisfied } from "@mui/icons-material";
// // import { Button } from "@mui/material";
// // import { Typography } from "@mui/material";
// // import { Avatar } from "@mui/material";
// // import {
// //   CircularProgress,
// //   Grid,
// //   InputAdornment,
// //   TextField,
// // } from "@mui/material";
// // import { Stack } from "@mui/system";
// // import { Box } from "@mui/system";
// // import axios from "axios";
// // import { useSnackbar } from "notistack";
// // import React, { useEffect, useState } from "react";
// // import { Link, useHistory } from "react-router-dom";
// // import { config } from "../App";
// // import Footer from "./Footer";
// // import Header from "./Header";
// // import ProductCard from "./ProductCard";
// // import "./Products.css";

// // // Definition of Data Structures used
// // /**
// //  * @typedef {Object} Product - Data on product available to buy
// //  *
// //  * @property {string} name - The name or title of the product
// //  * @property {string} category - The category that the product belongs to
// //  * @property {number} cost - The price to buy the product
// //  * @property {number} rating - The aggregate rating of the product (integer out of five)
// //  * @property {string} image - Contains URL for the product image
// //  * @property {string} _id - Unique ID for the product
// //  */

// // const product = [
// //   {
// //     name: "Tan Leatherette Weekender Duffle",
// //     category: "Fashion",
// //     cost: 150,
// //     rating: 4,
// //     image:
// //       "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png",
// //     _id: "PmInA797xJhMIPti",
// //   },
// // ];
// // const Products = () => {
// //   const [data, setData] = useState(product);
// //   const [loading, setLoading] = useState(true);
// //   const { enqueueSnackbar } = useSnackbar();

// //   // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
// //   /**
// //    * Make API call to get the products list and store it to display the products
// //    *
// //    * @returns { Array.<Product> }
// //    *      Array of objects with complete data on all available products
// //    *
// //    * API endpoint - "GET /products"
// //    *
// //    * Example for successful response from backend:
// //    * HTTP 200
// //    * [
// //    *      {
// //    *          "name": "iPhone XR",
// //    *          "category": "Phones",
// //    *          "cost": 100,
// //    *          "rating": 4,
// //    *          "image": "https://i.imgur.com/lulqWzW.jpg",
// //    *          "_id": "v4sLtEcMpzabRyfx"
// //    *      },
// //    *      {
// //    *          "name": "Basketball",
// //    *          "category": "Sports",
// //    *          "cost": 100,
// //    *          "rating": 5,
// //    *          "image": "https://i.imgur.com/lulqWzW.jpg",
// //    *          "_id": "upLK9JbQ4rMhTwt4"
// //    *      }
// //    * ]
// //    *
// //    * Example for failed response from backend:
// //    * HTTP 500
// //    * {
// //    *      "success": false,
// //    *      "message": "Something went wrong. Check the backend console for more details"
// //    * }
// //    */

// //   useEffect(() => {
// //     performAPICall();
// //   }, []);

// //   const performAPICall = async () => {
// //     axios
// //       .get(`${config.endpoint}/products`)
// //       .then((res) => {
// //         setData(res.data);
// //         setLoading(false);
// //         console.log("res", res);
// //       })
// //       .catch((err) => {
// //         if (err.response) {
// //           enqueueSnackbar(err.response?.statusText, { variant: "error" });
// //         } else {
// //           enqueueSnackbar(err, { variant: "error" });
// //         }
// //         console.log("err", err);
// //       });
// //   };

// //   // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
// //   /**
// //    * Definition for search handler
// //    * This is the function that is called on adding new search keys
// //    *
// //    * @param {string} text
// //    *    Text user types in the search bar. To filter the displayed products based on this text.
// //    *
// //    * @returns { Array.<Product> }
// //    *      Array of objects with complete data on filtered set of products
// //    *
// //    * API endpoint - "GET /products/search?value=<search-query>"
// //    *
// //    */
// //   const performSearch = async (text) => {
// //     const searchURL = `${config.endpoint}/products/search?value=${text}`;

// //     try {
// //       let searchedProds = await axios.get(searchURL);
// //       console.log(searchedProds);
// //       setLoading(false);
// //       setData(searchedProds.data);
// //     } catch(err) {
// //       if (err.response.status === 404) {
// //         setData([]);
// //       }
// //     }
// //     // axios
// //     //   .get(`${config.endpoint}/products/search?value=${text}`)
// //     //   .then((res) => {
// //     //     setData(res.data);
// //     //     setLoading(false);
// //     //     console.log("res search", res);
// //     //   })
// //     //   .catch((err) => {
// //     //     if (err.response) {
// //     //       setData(err.response?.data);
// //     //       enqueueSnackbar(err.response?.statusText, { variant: "error" });
// //     //     } else {
// //     //       enqueueSnackbar(err, { variant: "error" });
// //     //     }

// //     //     console.log("err", err.response);
// //     //   });
// //   };

// //   // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
// //   /**
// //    * Definition for debounce handler
// //    * With debounce, this is the function to be called whenever the user types text in the searchbar field
// //    *
// //    * @param {{ target: { value: string } }} event
// //    *    JS event object emitted from the search input field
// //    *
// //    * @param {NodeJS.Timeout} debounceTimeout
// //    *    Timer id set for the previous debounce call
// //    *
// //    */
// //   const debounceSearch = (event, debounceTimeout) => {
// //     let text=event.target.value;
// //     let timerId
// //     if(timerId){clearTimeout(timerId)}
// //      timerId=setTimeout(()=>{
// //       performSearch(text)
// //      },debounceTimeout)
// //   };

// //   return (
// //     <div>
// //       <Header>
// //         {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
// //         <TextField
// //           className="search-desktop"
// //           size="small"
// //           fullWidth
// //           InputProps={{
// //             endAdornment: (
// //               <InputAdornment position="end">
// //                 <Search color="primary" />
// //               </InputAdornment>
// //             ),
// //           }}
// //           placeholder="Search for items/categories"
// //           name="search"
// //           onChange={(e) => debounceSearch(e,500)}
// //         />
// //       </Header>

// //       {/* Search view for mobiles */}
// //       <TextField
// //         className="search-mobile"
// //         size="small"
// //         fullWidth
// //         InputProps={{
// //           endAdornment: (
// //             <InputAdornment position="end">
// //               <Search color="primary" />
// //             </InputAdornment>
// //           ),
// //         }}
// //         placeholder="Search for items/categories"
// //         name="search"
// //         onChange={(e) => debounceSearch(e,500)}
// //       />
// //       <Grid container>
// //         <Grid item className="product-grid">
// //           <Box className="hero">
// //             <p className="hero-heading">
// //               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
// //               to your door step
// //             </p>
// //           </Box>
// //         </Grid>
// //       </Grid>

// //       <Box mt={2} mb={2}>
// //         {loading ? (
// //           <div className="loadingDiv">
// //             <CircularProgress></CircularProgress>
// //             <Typography variant="h6">Loading Products...</Typography>
// //           </div>
// //         ) : (
// //           <Grid container>
// //             {data?.length ? (
// //               data.map((elem) => {
// //                 return (
// //                   <Grid item key={elem._id} mt={2} md={3} xs={6}>
// //                     <ProductCard product={elem} />
// //                   </Grid>
// //                 );
// //               })
// //             ) : (
// //               <div className="loadingDiv">
// //                 <span>😐</span>
// //                 <Typography variant="h6">No products found</Typography>
// //               </div>
// //             )}
// //           </Grid>
// //         )}
// //       </Box>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default Products;

// import { Search, SentimentDissatisfied } from "@mui/icons-material";
// import {
//   CircularProgress,
//   Grid,
//   InputAdornment,
//   TextField,
// } from "@mui/material";
// import { Box } from "@mui/system";
// import axios from "axios";
// import { useSnackbar } from "notistack";
// import React, { useEffect, useState } from "react";
// import { config } from "../App";
// import Footer from "./Footer";
// import Header from "./Header";
// import "./Products.css";
// import ProductCard from "./ProductCard";
// import Cart from "./Cart";
// import { generateCartItemsFrom } from "./Cart";
// import { SettingsSystemDaydreamSharp } from "@mui/icons-material";

// // Definition of Data Structures used
// /**
//  * @typedef {Object} Product - Data on product available to buy
//  *
//  * @property {string} name - The name or title of the product


// /**
//  * @typedef {Object} CartItem -  - Data on product added to cart
//  * 
//  * @property {string} name - The name or title of the product in cart
//  * @property {string} qty - The quantity of product added to cart
//  * @property {string} category - The category that the product belongs to
//  * @property {number} cost - The price to buy the product
//  * @property {number} rating - The aggregate rating of the product (integer out of five)
//  * @property {string} image - Contains URL for the product image
//  * @property {string} _id - Unique ID for the product
//  */

// const Products = () => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [isLoading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [cartData, setCartData] = useState([]);
//   const [completeCartData, setCompleteCartData] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [debounceTimeout, setDebounceTimeout] = useState(null);
//   const token = localStorage.getItem("token");

//   // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
//   /**
//    * Make API call to get the products list and store it to display the products
//    *
//    * @returns { Array.<Product> }
//    *      Array of objects with complete data on all available products
//    *
//    * API endpoint - "GET /products"
//    *
//    * Example for successful response from backend:
//    * HTTP 200
//    * [
//    *      {
//    *          "name": "iPhone XR",
//    *          "category": "Phones",
//    *          "cost": 100,
//    *          "rating": 4,
//    *          "image": "https://i.imgur.com/lulqWzW.jpg",
//    *          "_id": "v4sLtEcMpzabRyfx"
//    *      },
//    *      {
//    *          "name": "Basketball",
//    *          "category": "Sports",
//    *          "cost": 100,
//    *          "rating": 5,
//    *          "image": "https://i.imgur.com/lulqWzW.jpg",
//    *          "_id": "upLK9JbQ4rMhTwt4"
//    *      }
//    * ]
//    *
//    * Example for failed response from backend:
//    * HTTP 500
//    * {
//    *      "success": false,
//    *      "message": "Something went wrong. Check the backend console for more details"
//    * }
//    */
//   const performAPICall = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${config.endpoint}/products`);
//       setLoading(false);
//       setProducts(response.data);
//       setFilteredProducts(response.data);
//     } catch (e) {
//       setLoading(false);
//       if (e.response && e.response.status === 500) {
//         enqueueSnackbar(e.response.message, { variant: "error" });
//         return null;
//       } else {
//         enqueueSnackbar(
//           "Couldn't fetch products. Check that the backend is running,reachable and returns valid JSON.",
//           { variant: "error" }
//         );
//       }
//     }
//   };

//   // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
//   /**
//    * Definition for search handler
//    * This is the function that is called on adding new search keys
//    *
//    * @param {string} text
//    *    Text user types in the search bar. To filter the displayed products based on this text.
//    *
//    * @returns { Array.<Product> }
//    *      Array of objects with complete data on filtered set of products
//    *
//    * API endpoint - "GET /products/search?value=<search-query>"
//    *
//    */
//   const performSearch = async (text) => {
//     try {
//       const response = await axios.get(
//         `${config.endpoint}/products/search?value=${text}`
//       );
//       setFilteredProducts(response.data);
//       console.log(response.data, "perform data");
//     } catch (e) {
//       if (e.response) {
//         if (e.response.status === 404) {
//           setFilteredProducts([]);
//         }
//         if (e.response.data === 500) {
//           enqueueSnackbar(e.response.data.message, { variant: "error" });
//           setFilteredProducts(products);
//         }
//       } else {
//         enqueueSnackbar(
//           "Could not fetch products. Check that the backend is running, reachable and returns valid JSON.",
//           { variant: "error" }
//         );
//       }
//     }
//   };

//   // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
//   /**
//    * Definition for debounce handler
//    * With debounce, this is the function to be called whenever the user types text in the searchbar field
//    *
//    * @param {{ target: { value: string } }} event
//    *    JS event object emitted from the search input field
//    *
//    * @param {NodeJS.Timeout} debounceTimeout
//    *    Timer id set for the previous debounce call
//    *
//    */
//   const debounceSearch = (event, debounceTimeout) => {
//     const value = event.target.value;
//     if (debounceTimeout) {
//       clearTimeout(debounceTimeout);
//     }
//     const timeout = setTimeout(async () => {
//       await performSearch(value);
//     }, 500);
//     setDebounceTimeout(timeout);
//   };
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   useEffect(() => {
//     performAPICall();
//     fetchCart(token);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   useEffect(() => {
//     console.log("products", products);
//     try {
//       const completeCartData = generateCartItemsFrom(cartData, products);
//       console.log("completeCartData", completeCartData);
//       setCompleteCartData(completeCartData);
//     } catch (err) {
//       console.log("err", err);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [cartData, products]);

//   /**
//    * Perform the API call to fetch the user's cart and return the response
//    *
//    * @param {string} token - Authentication token returned on login
//    *
//    * @returns { Array.<{ productId: string, qty: number }> | null }
//    *    The response JSON object
//    *
//    * Example for successful response from backend:
//    * HTTP 200
//    * [
//    *      {
//    *          "productId": "KCRwjF7lN97HnEaY",
//    *          "qty": 3
//    *      },
//    *      {
//    *          "productId": "BW0jAAeDJmlZCF8i",
//    *          "qty": 1
//    *      }
//    * ]
//    *
//    * Example for failed response from backend:
//    * HTTP 401
//    * {
//    *      "success": false,
//    *      "message": "Protected route, Oauth2 Bearer token not found"
//    * }
//    */
//   const fetchCart = async (token) => {
//     if (!token) return;
//     const url = config.endpoint + "/cart";
//     try {
//       // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
//       const result = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       console.log("result", result);
//       setCartData(result.data);
//       return result.data;
//     } catch (e) {
//       if (e.response && e.response.status === 400) {
//         enqueueSnackbar(e.response.data.message, { variant: "error" });
//       } else {
//         enqueueSnackbar(
//           "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
//           {
//             variant: "error",
//           }
//         );
//       }
//       return null;
//     }
//   };

//   // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
//   /**
//    * Return if a product already is present in the cart
//    *
//    * @param { Array.<{ productId: String, quantity: Number }> } items
//    *    Array of objects with productId and quantity of products in cart
//    * @param { String } productId
//    *    Id of a product to be checked
//    *
//    * @returns { Boolean }
//    *    Whether a product of given "productId" exists in the "items" array
//    *
//    */
//   const isItemInCart = (productIdx) => {
//     for (let i = 0; i < cartData.length; i++) {
//       if (cartData[i].productId === productIdx) return true;
//     }
//     return false;
//   };

//   /**
//    * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
//    *
//    * @param {string} token
//    *    Authentication token returned on login
//    * @param { Array.<{ productId: String, quantity: Number }> } items
//    *    Array of objects with productId and quantity of products in cart
//    * @param { Array.<Product> } products
//    *    Array of objects with complete data on all available products
//    * @param {string} productId
//    *    ID of the product that is to be added or updated in cart
//    * @param {number} qty
//    *    How many of the product should be in the cart
//    * @param {boolean} options
//    *    If this function was triggered from the product card's "Add to Cart" button
//    *
//    * Example for successful response from backend:
//    * HTTP 200 - Updated list of cart items
//    * [
//    *      {
//    *          "productId": "KCRwjF7lN97HnEaY",
//    *          "qty": 3
//    *      },
//    *      {
//    *          "productId": "BW0jAAeDJmlZCF8i",
//    *          "qty": 1
//    *      }
//    * ]
//    *
//    * Example for failed response from backend:
//    * HTTP 404 - On invalid productId
//    * {
//    *      "success": false,
//    *      "message": "Product doesn't exist"
//    * }
//    */
//   const addToCart = async (productId, qty, preventDuplicate = false) => {
//     // token,
//     // items,
//     // products,
//     // productId,
//     // qty,
//     // options = { preventDuplicate: false }
//     const url = config.endpoint + "/cart";
//     if (!isItemInCart(productId) && preventDuplicate) {
//       console.log(productId, qty);
//       const bodyPost = { productId: productId, qty: qty };
//       try {
//         const resultPost = await axios.post(url, bodyPost, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("resultPost", resultPost);
//         setCartData(resultPost.data);
//       } catch (err) {
//         console.log("err resultPost", err);
//       }
//     } else if (!preventDuplicate && isItemInCart(productId)) {
//       console.log(productId, qty);
//       const bodyPost = { productId: productId, qty: qty };
//       try {
//         const resultPost = await axios.post(url, bodyPost, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("resultPost", resultPost);
//         setCartData(resultPost.data);
//       } catch (err) {
//         console.log("err resultPost", err);
//       }
//     }
//     else if(isItemInCart(productId) && preventDuplicate)
//     {
//       enqueueSnackbar(
//         "item already in cart",
//         {
//           variant: "warning",
//         }
//       );
//     }
//   };

//   return (
//     <div>
//       <Header>
//         {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
//         <TextField
//           className="search-desktop"
//           size="small"
//           InputProps={{
//             className: "search",
//             endAdornment: (
//               <InputAdornment position="end">
//                 <Search color="primary" />
//               </InputAdornment>
//             ),
//           }}
//           placeholder="Search for items/categories"
//           name="search"
//           onChange={(e) => debounceSearch(e, debounceTimeout)}
//         />
//       </Header>

//       {/* Search view for mobiles */}
//       <TextField
//         className="search-mobile"
//         size="small"
//         fullWidth
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <Search color="primary" />
//             </InputAdornment>
//           ),
//         }}
//         placeholder="Search for items/categories"
//         name="search"
//         onChange={(e) => debounceSearch(e, debounceTimeout)}
//       />
//       <Grid container>
//         <Grid item className="product-grid" md={token ? 9 : 12}>
//           <Box className="hero">
//             <p className="hero-heading">
//               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
//               to your door step
//             </p>
//           </Box>

//           {isLoading ? (
//             <Box className="loading">
//               <CircularProgress />
//               <h4>Loading Products...</h4>
//             </Box>
//           ) : (
//             <Grid container marginY="1rem" paddingX="1rem" spacing={2}>
//               {filteredProducts.length ? (
//                 filteredProducts.map((product) => (
//                   <Grid item xs={6} md={3} key={product._id}>
//                     <ProductCard
//                       product={product}
//                       handleAddToCart={addToCart}
//                     />
//                   </Grid>
//                 ))
//               ) : (
//                 <Box className="loading">
//                   <SentimentDissatisfied color="action" />
//                   <h4 style={{ color: "#636363" }}>No products found</h4>
//                 </Box>
//               )}
//             </Grid>
//           )}
//         </Grid>
//         {token && (
//           <Grid item md={3} sm={12}>
//             <Cart products={completeCartData} handleQuantity={addToCart}></Cart>
//           </Grid>
//         )}
//       </Grid>

//       {/* TODO: CRIO_TASK_MODULE_CART - Display the Cart component */}

//       <Footer />
//     </div>
//   );
// };

// export default Products;





import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import { generateCartItemsFrom } from "./Cart.js";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
import Header from "./Header";
import "./Products.css";


/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(0);
  const [debounce, setDebounce] = useState();
  const [cartItem, setCartItem] = useState([]);
  const [items, setItems] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    debounceSearch(e, 500);
  };

  const token = localStorage.getItem("token");

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  useEffect(() => {
    performAPICall();
    // eslint-disable-next-line
  }, []);

  const performAPICall = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${config.endpoint}/products`);
      setProducts(res.data);
      setLoading(false);
      const cartData = await fetchCart(token);
      setItems(cartData);
      const cart = await generateCartItemsFrom(cartData, res.data);
      setCartItem(cart);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    try {
      const searchData = await axios.get(
        `${config.endpoint}/products/search?value=${text}`
      );
      setStatus(0);
      setProducts(searchData.data);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      }
      if (e.response.status === 404) {
        setStatus(404);
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    if (debounce) {
      clearTimeout(debounce);
    }
    const debounceCall = setTimeout(() => {
      performSearch(event.target.value);
    }, debounceTimeout);
    setDebounce(debounceCall);
  };

  // const data = {
  //   name: "Tan Leatherette Weekender Duffle",
  //   category: "Fashion",
  //   cost: 150,
  //   rating: 4,
  //   image:
  //     "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png",
  //   _id: "PmInA797xJhMIPti",
  // };

  // return (
  //   <div>
  //

  //     {/* Search view for mobiles */}
  // };

  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */

  /**
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */
  const fetchCart = async (token) => {
    if (!token) return;

    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
      const cartData = await axios.get(`${config.endpoint}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return cartData.data;
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };

  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {
    if (items) {
      let check = items.filter((item) => item.productId === productId);
      if (check.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
  const updateCartItem = (updatedData, products) => {
    const recieveAllData = generateCartItemsFrom(updatedData, products);
    setCartItem(recieveAllData);
  };

  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
    if (!token) {
      enqueueSnackbar("Login to add an item to the Cart", {
        variant: "warning",
      });
      return;
    }
    if (options.preventDuplicate && isItemInCart(items, productId)) {
      enqueueSnackbar(
        "Item already in cart. Use the cart sidebar to update quantity or remove item.",
        { variant: "warning" }
      );
      return;
    }
    try {
      const toAdd = await axios.post(
        `${config.endpoint}/cart`,
        { productId, qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(toAdd.data);
      updateCartItem(toAdd.data, products);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
    }
  };

  return (
    <div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <TextField
          size="small"
          type="text"
          name="search-box"
          className="search-desktop"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleSearch(e)}
          placeholder="Search for items "
          value={search}
        />
      </Header>

      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        onChange={(e) => handleSearch(e)}
        placeholder="Search for items/categories"
        value={search}
      />
      <Grid container direction="row" justifyContent="center">
        <Grid container item md={token ? 9 : 12} spacing={2}>
          <Grid container>
            <Grid item className="product-grid">
              <Box className="hero" mb={3} mt={2}>
                <p className="hero-heading">
                  India’s{" "}
                  <span className="hero-highlight">FASTEST DELIVERY</span> to
                  your door step
                </p>
              </Box>
            </Grid>
          </Grid>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CircularProgress />
              <p>Loading Products...</p>
            </Box>
          ) : status === 404 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <SentimentDissatisfied />
              <p>No products found</p>
            </Box>
          ) : (
            <Grid container className="product-container" spacing={2}>
              {products.map((item) => (
                <Grid item xs={12} md={3} sm={6} key={item._id}>
                  <ProductCard
                    product={item}
                    handleAddToCart={async () => {
                      await addToCart(token, items, products, item._id, 1, {
                        preventDuplicate: true,
                      });
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
        {token && (<Grid item md={3} text-align="center" bgcolor="#E9F5E1">
          <Cart
            products={products}
            items={cartItem}
            handleQuantity={addToCart} 
          />
        </Grid>)}
      </Grid>
      <Footer />
    </div>
  );
};

export default Products;
