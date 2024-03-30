import React from "react";
import Layout from "../components/Layout/Layout.js";

const About = () => {
  return (
    <Layout title={"About us - BagBliss"}>
    <div className="row about-us">
      <div className="col-md-6">
        <img
        src="/images/aboutus.jpg"
        alt="aboutus"
        style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
      <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
      <p className="text-justify text-center mt-2">
      Bag Bliss is a fashion website dedicated to providing readers with the latest news, trends, and reviews in the world of designer bags. The site features expert analysis and opinion pieces on topics ranging from new product releases to celebrity fashion choices. With a focus on luxury brands and high-end fashion, Bag Bliss offers readers an exclusive look into the world of designer handbags
      </p>
      <h2 className="text-dark mt-4 mb-3">Our Mission</h2>
          <p className="text-justify">
            At Bag Bliss, our mission is to inspire and inform fashion
            enthusiasts about the latest trends and innovations in the world of
            designer bags. We strive to provide a platform where our readers can
            stay updated on the ever-evolving landscape of luxury fashion and
            make informed decisions when it comes to their own style.
          </p>
          <h2 className="text-dark mt-4 mb-3">Website Features</h2>
          <p className="text-justify">
            <strong>Wishlist:</strong> Explore our extensive collection of
            designer bags and create your wishlist. Add your favorite items,
            keep track of them, and easily access your wishlist whenever you
            visit Bag Bliss.
          </p>
          <p className="text-justify">
            <strong>Secure Payments:</strong> Shop with confidence knowing that
            we offer a variety of secure payment options. Whether you prefer to
            pay with your credit card, use online payment gateways, or opt for
            Cash on Delivery (COD), we've got you covered.
          </p>
          <h2 className="text-dark mt-4 mb-3">Our Commitment to You</h2>
          <p className="text-justify">
            At Bag Bliss, we are committed to providing a seamless and
            enjoyable shopping experience. Our user-friendly interface, secure
            transactions, and innovative features make us the go-to platform
            for fashion enthusiasts looking to stay ahead in the world of
            designer bags.
          </p>

      </div>
      </div>
        </Layout>
  );
};

export default About;