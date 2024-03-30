import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - BagBliss"}>
    <div className="row privacypolicy">
      <div className="col-md-6">
        <img
        src="/images/aboutus.jpg"
        alt="privacypolicy"
        style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
      <h1 className="bg-dark p-2 text-white text-center">PRIVACY POLICY</h1>
      <p>
            Welcome to BagBliss! This Privacy Policy outlines how we collect,
            use, disclose, and protect your information when you use our
            website.
          </p>

          <h3>Information We Collect</h3>
          <p>
            We collect information you provide directly to us, such as your
            name, email address, and any other information you choose to
            provide.
          </p>

          <h3>How We Use Your Information</h3>
          <p>
            We use the information we collect to provide, maintain, and improve
            our services, as well as to communicate with you about updates and
            promotions.
          </p>
          <h3>Disclosure of Your Information</h3>
          <p>
            We may disclose your information to third parties only in certain
            circumstances, such as when required by law or to protect our legal
            rights.
          </p>

          <h3>Security</h3>
          <p>
            We take reasonable measures to protect your information from
            unauthorized access or disclosure.
          </p>

          <h3>Changes to this Privacy Policy</h3>
          <p>
            We may update our Privacy Policy from time to time. Please review
            this page periodically for any changes.
          </p>
      </div>
      </div>
    </Layout>
  );
};

export default Policy;