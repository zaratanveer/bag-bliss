import React from "react";
import { NavLink, Link } from "react-router-dom";
import {useAuth} from "../../Context/auth.js";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput.js";
import useCategory from "../../Hooks/useCategory.js";
import { useCart } from "../../Context/cart.js";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const userRole = auth?.user?.role || 0; // Extract user role from the auth context
  
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "", 
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid ">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
            <img
                src="/images/baglogo.png"
                alt="Bag Logo"
                className="logo-img"
              />
              Bag Bliss
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput/>
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
     <Link
  className="nav-link dropdown-toggle"
   to ={"/categories"}
     data-bs-toggle="dropdown">
          Categories
  </Link>
  <ul className="dropdown-menu">
  <li key="all-categories">
  <Link className="dropdown-item p-3" to ={"/categories"}>
  All Categories
    </Link>
  </li>
  {categories?.map((c) => (
    <li key={c._id}>
    <Link
     className="dropdown-item p-3"
      to ={`/category/${c.slug}`}>
      {c.name}
    </Link>
    </li>
    ))}
    </ul>
      </li>
              {
                !auth.user ? (<>
                  <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
                </>) : (
                  <> 
     <li className="nav-item dropdown">
  <NavLink 
  className="nav-link dropdown-toggle"
   href="#"
    role="button"
     data-bs-toggle="dropdown"
      aria-expanded="false"
      >
   {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu">
    <li>
    <NavLink to = {`/dashboard/${
      auth?.user?.role === 1 ? "admin" : "user"
          }`} 
    className="dropdown-item p-2 m-2 ">
    DashBoard
    </NavLink>
    </li>
    <li>
    <NavLink
     onClick={handleLogOut}
      to="/login" 
      className="dropdown-item p-2 m-2">
          LogOut
       </NavLink>
    </li>
  </ul>
</li>
                </>)
              }
                <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                CART
                <Badge count={cart?.length} showZero offset={[10, -5]}>
        </Badge>
        </NavLink>
                </li>
                 {/* Conditionally render Wishlist link based on user role */}
      {userRole !== 1 && (
        <li className="nav-item">
          <NavLink to="/wishlist" className="nav-link">
            Wishlist
          </NavLink>
        </li>
      )}
          </ul>
        </div>
      </div>
    </nav>
  </>
  );
  };
    export default Header;