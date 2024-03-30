import express from "express";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";
import
 { 
    addToWishlistController,
    braintreePaymentController,
    braintreeTokenController,
    codPaymentController,
    createProductController,
     deleteProductController,
      getProductController,
       getSingleProductController,
        getWishlistController,
        productCategoryController,
        productCountController,
         productFiltersController,
          productListController,
           productPhotoController,  
           rateProductController,  
           relatedProductController,  
           removeFromWishlistController,   
           reviewProductController,   
           searchProductController,
            updateProductController,
         } from "../Controllers/productController.js";
import formidable from "express-formidable";

// router object
const router = express.Router();

//Routing Perform
//Create Product

router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

//Get Product
router.get("/get-product", getProductController);

//Get Single Product
router.get("/get-product/:slug", getSingleProductController);

//Get Photo
router.get("/product-photo/:pid", productPhotoController);

//Delete Product
router.delete("/delete-product/:pid", deleteProductController);

//Update Product
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);

//Filter Product
router.post("/product-filters", productFiltersController);

// Product Count
router.get("/product-count", productCountController);

// Product Per Page
router.get("/product-list/:page", productListController);

// Search Product
router.get("/search/:keyword", searchProductController);

//Similar Products
router.get("/related-product/:pid/:cid", relatedProductController);

//Category wise Product
router.get("/product-category/:slug", productCategoryController);

//payment Routes
//TokeN
router.get("/braintree/token", braintreeTokenController);

//Payment
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

//COD payment
router.post("/cashondelivery/payment", requireSignIn, codPaymentController);

// WISHLIST
router.post("/add-to-wishlist/:productId", requireSignIn, addToWishlistController);
router.post("/remove-from-wishlist/:productId", requireSignIn, removeFromWishlistController);
router.get("/get-wishlist", requireSignIn, getWishlistController);

// New Rating Endpoint
router.post("/rate-product/:productId", requireSignIn, rateProductController);

//Review 
router.post("/review-product/:pid", requireSignIn, reviewProductController);


export default router;