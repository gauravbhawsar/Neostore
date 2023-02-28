import { useState, useEffect } from "react";
import React from "react";
import jwt_decode from "jwt-decode";
import { useLocation } from "react-router-dom";
import moment from "moment";

import { Link } from "react-router-dom";
import ReactToPdf from "react-to-pdf";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { sendEmail } from "../Services/orderServices";
import Navbar from "./Navbar";
import Footer from "./Footer";

const options = {
  orientation: "potrait",
  unit: "in",
  format: "A4",
};

const Preview = () => {
  const [user, setUser] = useState("");
  const location = useLocation();
  const ref = React.createRef();

  useEffect(() => {
    let token = localStorage.getItem("token");
    let decode = jwt_decode(token);
    setUser(decode);
  }, []);
  // function for creating pdf and api call for sending mail to the user
  const sendmail = () => {
    let email = user.data.email;
    const input = document.getElementById("divToPrint");

    html2canvas(input, { useCORS: true }).then((canvas) => {
      const pdf = new jsPDF();
      const img = canvas.toDataURL(
        "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
      );
      pdf.addImage(img, "JPEG", 15, 40, 180, 160);
      const filedata = pdf.output("blob");
      let formData = new FormData();
      formData.append("file", filedata, "samplefile");
      sendEmail(formData, email);
    });
  };

  return (
    <div>
      <Navbar />
      {user ? (
        <div className="container">
          <nav class="navbar">
            <div class="container-fluid">
              <Link to="/account/orders">
                <button className="btn btn-info">Go Back</button>
              </Link>
              <div className=" d-flex justify-content-sm-end">
                <ReactToPdf
                  targetRef={ref}
                  filename={`_invoice.pdf`}
                  options={options}
                  x={0.6}
                  y={0.3}
                  scale={0.6}
                >
                  {({ toPdf }) => (
                    <button
                      className="btn btn-info"
                      onClick={() => toPdf()}
                      variant="contained"
                    >
                      Download
                    </button>
                  )}
                </ReactToPdf>
              </div>
              <button onClick={sendmail} className="btn btn-info">
                Send Email
              </button>
            </div>
          </nav>

          <div ref={ref} id="divToPrint">
            <nav class="navbar  navbar-light bg-light">
              <div class="container-fluid" style={{ height: "168px" }}>
                <img
                  src="../images/invoice_logo.jfif"
                  alt="Logo"
                  height="85px"
                  width="130px"
                  opacity=" 2"
                  class="d-inline-block align-text-top"
                  style={{ marginLeft: "15px", marginTop: "5px" }}
                />
                <h3 style={{ marginRight: "20px", marginTop: "5px" }}>
                  Invoice
                </h3>
              </div>
            </nav>
            <div className="row m-0 border">
              <div className="col text-left mt-3 ml-4">
                <h5>supplier</h5>
                <h6>Gaurav Bhawsar</h6>
                <h6>gauravbhawsar98@gmail.com</h6>
                <h6>7746838985</h6>
                <br />
                <h5>client</h5>
                <h6>{`${user.data.firstName} ${user.data.lastName}`}</h6>
                <h6>{user.data.email}</h6>
                <h6>{user.data.address.adress}</h6>{" "}
              </div>
              <div className="col text-right mr-4">
                <h5
                  className="mt-3"
                  style={{ textAlign: "right", marginRight: "15px" }}
                >
                  Status
                </h5>
                <h6
                  style={{
                    textAlign: "right",
                    marginRight: "15px",
                    color: "green",
                    fontSize: "20px",
                  }}
                >
                  PAID
                </h6>
                <br />
                <h5 style={{ textAlign: "right", marginRight: "15px" }}>
                  Order Date
                </h5>
                <h6 style={{ textAlign: "right", marginRight: "15px" }}>
                  {moment(location.state.order.createdAt).format("MMM Do YYYY")}
                </h6>
                <h5 style={{ textAlign: "right", marginRight: "15px" }}>
                  Amount
                </h5>
                <h6 style={{ textAlign: "right", marginRight: "15px" }}>
                  <i className="fa fa-inr mx-2"></i>{" "}
                  <span style={{ color: "green" }}>
                    {location.state.order.totalPrice}
                  </span>
                </h6>
              </div>
            </div>
            <br />
            <div className="container-fluid">
              <table class="table m-4">
                <thead>
                  <tr>
                    <th scope="col">Sr No</th>
                    <th scope="col">Item</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Price</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {location.state.order.productDetails.map((ele, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{ele.name}</td>
                      <td>{ele.quantity}</td>
                      <td>{ele.price}</td>
                      <td>{ele.price * ele.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        "hello"
      )}
      <Footer />
    </div>
  );
};
export default Preview;
