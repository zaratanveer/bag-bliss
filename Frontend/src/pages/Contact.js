import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";

const Contact = () => {
  const instagramId = "bag_bliss_55";
  return (
    <Layout title={"Contact us - BagBliss"}>
      <div className="row contactus ">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            <h4>For any Query and Info about Product feel Free to call anytime we
            24x7 Available</h4>
          </p>
          <div className="mt-4">
            <p className="contact-info">
              <BiMailSend /> :{" "}
              <a href="mailto:help@BagBliss.com"
              style={{ color: "purple"}}
              >
              help@BagBliss.com
              </a>
            </p>
            <p className="contact-info">
              <BiPhoneCall /> : <strong>0333-4633490</strong>
            </p>
            <p className="contact-info">
              <FaInstagram style={{ marginRight: "8px" }} />
              <a
                href={`https://www.instagram.com/${instagramId}/`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "purple"}}
              >
                Follow us on Instagram
              </a>
              </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
