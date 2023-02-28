import React from "react";

const Footer = () => {
  return (
    <div>
      <div
        className="row text-center"
        style={{ backgroundColor: "black", color: "white" }}
      >
        <div className="col" style={{ margin: "0 60px 0 60px" }}>
          <h2>About Company</h2>
          <p>
            NeoSOFT Technologies is here at your quick and easy <br></br> for
            shoping.
            <br></br>
            Contact informtion <br></br>
            Email: contact@neosofttech.com <br></br>
            Phone: +91 0000000000<br></br>
            MUMBAI, INDIA
          </p>
        </div>
        <div className="col" style={{ margin: "0 60px 0 60px" }}>
          <h2>Informtion</h2>
          <p>
            Terms and Conditions <br></br>
            Gurantee and Return Policy<br></br>
            Contact Us<br></br>
            Privacy Policy<br></br>
            Locate Us
          </p>
        </div>
        <div className="col" style={{ margin: "0 60px 0 60px" }}>
          <h2>Newsletter</h2>
          <p>
            Signup to get exclusive offer from our favorite brands and to{" "}
            <br></br>
            be well up in the news{" "}
          </p>
          <input placeholder="your email..." /> <br></br>
          <button>Subscribe</button>
        </div>
      </div>
      <div
        className="text-center"
        style={{ backgroundColor: "black", color: "white" }}
      >
        Copyright 2021 NeoSOFT Technologies All rights reserved | Design By
        Gaurav Bhawsar
      </div>
    </div>
  );
};

export default Footer;
