import React, { useState, useRef } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import SocialButton from "./SocialButton";
import NavbarFirst from "./NavbarFirst";
import Footer from "./Footer";
import { getUser, login } from "../Services/userServices";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailref = useRef("");
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  // validation function
  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  // api call for user login
  const checkdata = async () => {
    const formData = {
      email: state.email,
      password: state.password,
    };
    login(formData).then((res) => {
      if (res.data.error !== "0") {
        localStorage.setItem("token", res.data.token);
        let decode = jwtDecode(res.data.token);
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
          let updatedCart = cart.concat(decode.data.cart);
          dispatch({
            type: "SetCart",
            payload: updatedCart.length,
          });
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        } else {
          dispatch({
            type: "SetCart",
            payload: decode.data.cart.length,
          });
          localStorage.setItem("cart", JSON.stringify(decode.data.cart));
        }
        navigate("/");
      } else {
        alert("check email or password");
      }
    });
  };

  //api call for social LOgin
  const handleSocialLogin = async (user) => {
    let formdata = {
      email: user._profile.email,
    };
    getUser(formdata).then((res) => {
      if (res.data.error == "0") {
        localStorage.setItem("token", res.data.token);
        let decode = jwtDecode(res.data.token);
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
          let updatedCart = cart.concat(decode.data.cart);
          dispatch({
            type: "SetCart",
            payload: updatedCart.length,
          });
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        } else {
          dispatch({
            type: "SetCart",
            payload: decode.data.cart.length,
          });
          localStorage.setItem("cart", JSON.stringify(decode.data.cart));
        }

        navigate("/");
      } else {
        alert("Not registerd");
      }
    });
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };
  return (
    <div>
      <NavbarFirst />

      <div className="row m-5">
        <div className="col mt-3" style={{ borderRight: "solid 2px black" }}>
          <div style={{ marginLeft: "400px" }}>
            <SocialButton
              provider="google"
              appId="420321224046-je2rf4df9mqcua73ve0usqqvrsoqvdi5.apps.googleusercontent.com"
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
              className="btn btn-danger mb-3"
            >
              <i className="fa fa-google mr-1" />
              Continue with Google
            </SocialButton>
            <SocialButton
              provider="facebook"
              appId="1308361419632866"
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
              className="btn btn-primary mb-3"
            >
              <i className="fa fa-facebook mr-1"></i>
              Continue With facebook
            </SocialButton>
          </div>
        </div>
        <div className=" col ml-4">
          <Card style={{ width: "50ch" }} className="my-3">
            <Card.Body>
              <Card.Title>Login to NeoSTORE</Card.Title>
              <input
                type="text"
                className="form-control mt-3"
                name="email"
                ref={emailref}
                onBlur={(e) => handler(e)}
                placeholder="Email Address"
              />
              <input
                type="password"
                className="form-control mt-3"
                name="password"
                onBlur={(e) => handler(e)}
                placeholder="Password"
              />
              <button className="btn btn-info mt-3" onClick={() => checkdata()}>
                Login
              </button>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          style={{ backgroundColor: "white", border: "0px" }}
          onClick={() => navigate("/registration")}
        >
          register
        </button>

        <button
          style={{ backgroundColor: "white", border: "0px" }}
          onClick={() => navigate("/recoverPassword", { state })}
        >
          forget?
        </button>
      </div>
      <Footer />
    </div>
  );
}
