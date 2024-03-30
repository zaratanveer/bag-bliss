import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/cart.js";
import toast from "react-hot-toast";
import StarRating from "./../components/starRating.js";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userReview, setUserReview] = useState("");

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem("productRatings")) || {};
    setUserRating(savedRatings[products?._id] || 0);
  }, [products]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProducts(data?.products);
      getSimilarProduct(data?.products._id, data?.products.category._id);
      const userRatingFromStorage = localStorage.getItem(`userRating_${data.products._id}`);
      setUserRating(userRatingFromStorage ? parseFloat(userRatingFromStorage) : 0);
      setLoading(false);  // Set loading to false once product details are fetched
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRatingChange = (rating) => {
    setUserRating(rating);
    const updatedRatings = {
      ...JSON.parse(localStorage.getItem("productRatings")) || {},
      [products?._id]: rating,
    };
    localStorage.setItem("productRatings", JSON.stringify(updatedRatings));
  };

  const handleReviewSubmit = async () => {
    try {
  
      const response = await axios.post(
        `/api/v1/product/review-product/${products._id}`,
        {
          reviewText: userReview,
          rating: userRating,
        }
      );
      if (response.data.success) {
        toast.success("Review added successfully");
        setUserReview("");
        setUserRating(0);
      } else {
        toast.error("Failed to add review");
      }
    } catch (error) {
      console.error("Error while adding review:", error);
      toast.error("Error while adding review");
    }
  };
  
      
  return (
    <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row container mt-2">
          <div className="col-md-6"  key={products._id}>
              <img
                src={`/api/v1/product/product-photo/${products._id}`}
                className="card-img-top"
                alt={products.name}
                height="500"
            width={"400px"}
              />
              </div>
              <div className="col-md-6 product-details">
             
              <h1 className="text-center my-7">Bag Details</h1>
          <h6 className="p-1">Name: {products.name}</h6>
          <h6 className="p-1">Description: {products.description}</h6>
          <h6 className="p-1">Price: {products.price}</h6>
          <h6 className="p-1">Category: {products?.category?.name}</h6>
            <StarRating
              value={userRating}
              onChange={handleRatingChange}
            />
            <textarea
            className="form-control mt-2"
            placeholder="Write your review..."
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={handleReviewSubmit}>
            Submit Review
          </button>
            <button
              className="btn btn-secondary ms-2 p-2"
              onClick={() => {
                setCart([...cart, products]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, products])
                );
                toast.success("Item Added to Cart");
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      )}

      <div className="row container">
        <h1>Similar Products</h1>
        {relatedProducts.length < 1 && <p className="text-center">No Similar Products Found</p>}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-3" style={{ width: '18rem' }} key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
                <p className="card-text">Rs {p.price}</p>
                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setCart([...cart, products]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, products])
                    );
                    toast.success("Item Added to Cart");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

