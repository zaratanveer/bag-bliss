import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout.js";
import { useCart } from "../Context/cart.js";
import { useAuth } from "../Context/auth.js";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); 

  //Total Price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-PK", {
      style: "currency",
      currency:"PKR",
      } );
    } catch (error) {
      console.log(error);
    }
  }

  //Delete Item
 const removeCartItem = (pid) => {
  try {
    let myCart = [...cart];
    let index =myCart.findIndex((item) => item._id === pid);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  } catch (error) {
    console.log(error);
  }
 };

//get payment gateway token
 const getToken = async () => {
  try {
    const {data} = await axios.get("/api/v1/product/braintree/token")
    setClientToken(data?.clientToken)
  } catch (error) {
    console.log(error);
  }
 }
 useEffect(() => {
   getToken()
 }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
        paymentMethod: 'card',
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
};

const handleCashOnDelivery = async () => {
  setPaymentMethod('COD');
  try {
    setLoading(true);
    const { data } = await axios.post("/api/v1/product/cashondelivery/payment", {
      cart,
      paymentMethod: 'COD',
    });
    setLoading(false);
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/dashboard/user/orders"); // Navigate to user dashboard orders
    toast.success("Order placed using Cash on Delivery");
  } catch (error) {
    console.error('Error in COD payment:', error);
    console.log('Error response:', error.response);
    setLoading(false);
  }
};

  return (
    <Layout>
      <div className="container">
        <div className="row">
        <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
            {`Heyy ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
               ? `You Have ${cart.length} items in your Cart ${
                auth?.token ? "" : "Please Login to Checkout"
                }`   
                : "Your Cart is Empty"}
            </h4>
            </div>
        </div>
        <div className="container">
        <div className="row">
        <div className="col-md-8 p-0 m-0">
        {
          cart?.map( (p) => (
            <div className="row mb-2 p-3 card flex-row" key={p._id}>
            <div className="col-md-4">
            <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="90%"
                      height={"90px"}
                    />
            </div>
            <div className="col-md-8">
            <h3>{p.name}</h3>
                    <h5>{p.description.substring(0, 30)}</h5>
                    <h5>Price : {p.price}</h5>
          <button className="btn btn-danger p-2 m-2" onClick={() => removeCartItem(p._id)}>Remove</button>
            </div>
            </div>
          ))}
       </div>
       <div className="col-md-4 p-4 text-center">
           <h2>Cart Summary</h2>
          <h6>TotaL | Checkout | Payment</h6>
          <hr/>
          <h4>TotaL : {totalPrice()}</h4>
          {auth?.user?.address ? (
            <>
              <div className="mb-3">
              <h4>Current Address</h4>
              <h5>{auth?.user?.address}</h5>
          <button className="btn btn-outline-warning"
          onClick= { () => 
            navigate("/dashboard/user/profile")
          }
          >Update Address</button>
              </div>
            </>
          ): (
            <div className="mb-3">
              {
                auth?.token ? (
                  <button className="btn btn-outline-warning"
          onClick={() =>  
            navigate("/dashboard/user/profile")
  }
          >Update Address</button>
                ) : (
                  <button className="btn btn-outline-warning"
          onClick={() =>
           navigate("/login", {
            state:"/cart",
          })
     }        
              >
          Please Login to Checkout
          </button>
              )}
            </div>
          )}

          <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary ms-2"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                    <button
                        className="btn btn-secondary ms-1"
                   onClick={handleCashOnDelivery}
                   disabled={loading || !instance || !auth?.user?.address}
                           >
                 Pay with Cash on Delivery
                </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;