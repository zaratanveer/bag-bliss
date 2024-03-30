import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../Context/Wishlist.js";
import toast from "react-hot-toast";
import axios from "axios";

export const WishListButton = ({ product,  onWishlistToggle}) => {
  const [wishlist, setWishlist] = useWishlist([]);

  const isProductInWishlist = wishlist.some((p) => p._id === product._id);
  const handleToggleWishlist = async () => {
    try {
      const endpoint = wishlist.some((p) => p._id === product._id)
        ? `/api/v1/product/remove-from-wishlist/${product._id}`
        : `/api/v1/product/add-to-wishlist/${product._id}`;

      const response = await axios.post(endpoint);

      if (response.data.success) {
        setWishlist(response.data.wishlist);

        if (onWishlistToggle) {
          onWishlistToggle(!wishlist.some((p) => p._id === product._id));
        }

        toast.success(
          wishlist.some((p) => p._id === product._id)
            ? "Product removed from wishlist"
            : "Product added to wishlist"
        );
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.error("Error toggling wishlist");
    }
  };
  return (
    <span
      style={{
        cursor: "pointer",
        position:"relative",
        top: '1px',
          right: '8px', 
          display: 'block', 
          fontWeight: 'bold', 
            fontSize: '24px', 
      }}
      onClick={handleToggleWishlist}
    >
      {isProductInWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
    </span>
  );
};
export default WishListButton;