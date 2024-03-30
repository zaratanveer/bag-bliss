import { useState, useEffect, useContext, createContext } from "react";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    let existingWishlist = localStorage.getItem("wishlist");
    if (existingWishlist) setWishlist(JSON.parse(existingWishlist));
  }, []);
  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={[wishlist, setWishlist]}>
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => useContext(WishlistContext);

export { useWishlist, WishlistProvider };
