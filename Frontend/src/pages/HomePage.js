import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout.js";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import {Prices}  from "../components/Prices.js";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart.js";
import toast from "react-hot-toast";
import { useWishlist } from "../Context/Wishlist.js";
 import WishListButton from "../components/Wishlist.js";
import StarRating from "../components/starRating.js";
import { useAuth } from "../Context/auth.js";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
 const [wishlist, setWishlist] = useWishlist();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productRatings, setProductRatings] = useState({});
  //Get All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category")
      if (data?.success)
        setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);


  //Get Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //Get TotalCount
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //Load MOre
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //Filter by Category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();

  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Get Filtered Product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", { checked, radio });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }

  const handleRatingChange = (productId, rating) => {
    setProductRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: rating,
    }));
  };
  // Save ratings to local storage
  localStorage.setItem("productRatings", JSON.stringify(productRatings));
  return (
    <Layout title={"All Products - Buy Now"}>
      <video
        className="Banner-video"
        width="100%"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/images/Banner.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="row mt-3">
        <div className="col-md-3">
          <h2 className="text-center">Filter By Category</h2>
          <div className="Filter">
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* Price Filter */}
          <h2 className="text-center mt-4">Filter By Price</h2>
          <div className="Filter">
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="Filter">
          <button
  className="btn btn-danger m-4"
  onClick={() => window.location.reload()}
>
  RESET FILTERS
</button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
          {products?.map((p) => (
              <div className="card m-3" style={{ width: '18rem' }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name} 
                  />
                <div className="card-body"  >
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text">Rs {p.price}</p>
                      {/* Conditionally render the WishlistButton based on user role */}
                      {auth?.user?.role !== 1 && (
                  <WishListButton product={p} 
        onWishlistToggle={(isInWishlist) => {
                  if (isInWishlist) {
                    // Product is added to wishlist
                    setWishlist([...wishlist, p]);
                    toast.success("Item Added to Wishlist");
                  } else {
                    // Product is removed from wishlist
                    const updatedWishlist = wishlist.filter((item) => item._id !== p._id);
                    setWishlist(updatedWishlist);
                    toast.success("Item Removed from Wishlist");
                  }
                }}
                  />
                    )}
                  <StarRating
              value={productRatings[p._id] || 0}
              onChange={(rating) => handleRatingChange(p._id, rating)}
            />
             <br></br>
                  <button className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >View Details</button>
                 <button className="btn btn-secondary ms-1"  onClick={() => {
                      setCart([...cart, p])
                      toast.success("Item Added to Cart");
                    }}>
  ADD TO CART
</button>
                </div>
              </div>
            ))}
          </div>
          </div>
          
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
    </Layout>
  );
};

export default HomePage;