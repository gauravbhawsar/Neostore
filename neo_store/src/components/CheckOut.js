import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import swal from "sweetalert";
import jwtDecode from "jwt-decode";
import { createOrder } from "../Services/orderServices";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
const CheckOut = () => {
  const [addreses, setAddreses] = useState([]);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [totalamount, setTAmount] = useState(0);
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    cardNo: null,
    cvv: null,
  });
  const navigate = useNavigate();
  const location = useLocation();

  let decode;
  useEffect(() => {
    setTAmount(location.state.total);
    let token = localStorage.getItem("token");
    decode = jwtDecode(token);
    setEmail(decode.data.email);
    setAddreses(decode.data.address);
  }, []);
  // validatoin function for credit card details
  const checkCardDetails = () => {
    if (state.cvv.length !== 3) {
      swal({
        text: "Enter valid CVV",
        icon: "warning",
      });
    } else if (state.cardNo.length !== 16) {
      swal({
        text: "Enter valid Card No.",
        icon: "warning",
      });
    } else {
      setFlag(true);
      swal({
        text: "Details added Succesfully",
        icon: "success",
      });
    }
  };
  // api call for creating order
  const placeOrder = () => {
    if (flag) {
      if (amount != totalamount) {
        swal({
          text: "Enter correct amount",
          icon: "warning",
        });
      } else {
        let formdata = {
          address: document.getElementById("address").value,
          email,
          totalPrice: amount,
          products: location.state.cart,
        };
        createOrder(formdata).then((res) => {
          if (res.data.error === 0) {
            localStorage.removeItem("cart");
            dispatch({
              type: "SetCart",
              payload: 0,
            });
            swal({ text: "order placed Succesfully", icon: "success" });
            navigate("/products");
          } else {
            alert("something went wrong please try again later");
            navigate("/cart");
          }
        });
      }
    } else {
      swal({
        text: "Enter card Details",
        icon: "warning",
      });
    }
  };
  return (
    <div>
      <Navbar />
      <div className="row" style={{ marginBottom: "50px" }}>
        <div
          className="col col-3 p-2 mt-5 container"
          style={{
            backgroundImage: `url("../images/creditCard.png")`,
            backgroundSize: "400px",
            fontWeight: "bold",
            height: "250px",
            width: "500px",
            // boxShadow: "2px 3px 3px 2px #888888",
          }}
        >
          <div style={{ padding: "25px" }}>
            <span>Card No. : </span>
            <input
              id="cardNo"
              style={{ background: "none", border: "0px" }}
              type="number"
              onChange={(e) => setState({ ...state, cardNo: e.target.value })}
            ></input>
            <hr></hr>
            <span>Expiry : </span>{" "}
            <input
              style={{ background: "none", border: "0px" }}
              type="date"
              id="expiryDate"
            ></input>
            <hr></hr>
            <span>CVV : </span>{" "}
            <input
              style={{ background: "none", border: "0px" }}
              id="cvv"
              onChange={(e) => setState({ ...state, cvv: e.target.value })}
              type="number"
            ></input>
            <Button
              onClick={() => checkCardDetails()}
              style={{ width: "100%", marginTop: "25px", opacity: "0.3" }}
            >
              Submit
            </Button>
          </div>
        </div>
        <div
          className="col col-5 p-2 mt-5"
          style={{
            marginRight: "50px",
            fontWeight: "bold",
            padding: "4px",
            boxShadow: "2px 3px 3px 2px #888888",
          }}
        >
          <h4>CheckOut</h4>
          <hr></hr>
          <p>
            Order Total:
            <span style={{ marginLeft: "140px" }}>
              {location.state.total}
            </span>{" "}
          </p>
          <hr></hr>
          {addreses.length ? (
            <>
              <span>Shipping Address: </span>

              <select style={{ border: "1px solid green" }} id="address">
                {addreses &&
                  addreses.map((ele) => (
                    <option key={ele._id} value={ele.adress}>
                      {ele.adress}
                    </option>
                  ))}
              </select>
            </>
          ) : (
            <Button onClick={() => navigate("/account/address")}>
              Add Address
            </Button>
          )}
          <hr></hr>
          <p>
            <span>Enter Amount : </span>{" "}
            <input
              style={{ border: "1px solid green" }}
              id="amount"
              onChange={(e) => setAmount(e.target.value)}
            ></input>
          </p>
          <br></br>
          <Button onClick={() => placeOrder()} style={{ width: "100%" }}>
            Place Order
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckOut;
