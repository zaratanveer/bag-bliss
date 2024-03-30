import React, {useState} from "react";
import Layout from "./../../components/Layout/Layout.js";
import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/v1/auth/forgot-password",
         {  email, newPassword, answer}
         );
         if (res.data && res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
         } else {
          toast.error(res.data.message);
         };
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    };
  }; 
  return (
    <Layout title={"Forgot Password- BagBliss"}>
<div className="form-container">
        <form onSubmit={handleSubmit}>
        <h3 className="title"> RESET PASSWORD</h3>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your favourite Hobby"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter New Password"
              required
            />
          </div>
          <button
  type="submit"
  className="btn btn-primary"
>
  RESET
</button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;