import React from "react";
import Layout from "./../components/Layout/Layout.js";
import { useWishlist } from "../Context/Wishlist.js";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/auth.js";

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useWishlist();
  const [auth] = useAuth(); 
 
  const userRole = auth.user?.role || 0; // Replace 0 with your default role

  // If the user is an admin, redirect to the home page
  if (userRole === 1) {
    navigate("/");
    return null;
  }

  //Delete Item
  const removeItem = (productId) => {
    try {
      // Find the index of the item in the wishlist
      const index = wishlist.findIndex((item) => item._id === productId);

      if (index !== -1) {
        // Create a copy of the current wishlist
        const updatedWishlist = [...wishlist];
        // Remove the item from the copy
        updatedWishlist.splice(index, 1);
        // Update the wishlist state
        setWishlist(updatedWishlist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Wishlist">
      <div className="container">
      <h1 className="text-center mb-4">Your Wishlist</h1>
        {!auth.user ? (
          <div className="text-center">
            <CiHeart size={70} />
            <h4 className="text-center">Please log in to view your wishlist.</h4>
            <button className="btn btn-primary" onClick={() => navigate("/login")}>
              Log In
            </button>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center">
            <CiHeart size={70} />
        <h4 className="text-center">WISHLIST IS EMPTY.</h4>
        </div>
        ) : (
          <div className="row">
            {wishlist.map((p) => (
              <div className="col-md-4 mb-4" key={p._id}>
                <div className="card">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">Rs {p.price}</p>
                    <button className="btn btn-danger p-2 m-2" onClick={() => removeItem(p._id)}>Remove</button>
                  </div>
                </div>
                </div>
            ))}
          <div className="text-center mt-3">
            <p className="mb-2">.</p>
            <button className="btn btn-outline-warning" ></button>
          </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default WishlistPage;

