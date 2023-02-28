import React from "react";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { recoverPassword, saveNewPassword } from "../Services/userServices";
import Footer from "./Footer";
import NavbarFirst from "./NavbarFirst";
const regForpassword = RegExp(
  "^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,})"
);

export default function RecoverPassword(props) {
  const locatoin = useLocation();
  // console.log(locatoin.state);
  const emaill = locatoin.state.email;

  const navigate = useNavigate();
  const [otpp, setotpp] = useState();
  const [otp, setOtp] = useState("");
  const [state, setState] = useState({
    password: null,
    conpassword: null,
    errors: {
      password: "",
      conpassword: "",
    },
  });
  // api call for sending otp on users email
  const sendOtp = async () => {
    let userData = {
      email: emaill,
    };

    recoverPassword(userData).then((res) => {
      setOtp(res.data.otp);
    });
  };
  useEffect(async () => {
    sendOtp();
  }, []);
  // validetor function
  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
    let errors = state.errors;

    switch (name) {
      case "password":
        errors.password = regForpassword.test(value) ? "Invalid password" : "";
        setState({ ...state, password: value });
        break;
      case "conpassword":
        errors.conpassword =
          state.password === value ? "" : "password is not matched";
        break;
    }
  };
  // api call for saving new password
  const savepassword = async () => {
    if (otp == otpp) {
      const formData = {
        email: emaill,
        password: state.password,
        otp: otpp,
      };
      saveNewPassword(formData).then((res) => {
        if (res.data.error == 0) {
          alert("password recoverd");
          navigate("/");
        }
      });
    } else {
      alert("otp not matched");
    }
  };
  return (
    <div>
      <NavbarFirst />

      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: "50px", paddingBottom: "50px" }}
      >
        <Card style={{ width: "50ch" }} className="my-3">
          <Card.Body>
            <Card.Title>Recover Password</Card.Title>
            <Card.Text>
              {" "}
              <span style={{ color: "green" }}>OTP sent ont your email</span>
            </Card.Text>
            <input
              type="text"
              id="email"
              className="form-control mt-3"
              name="otp"
              onChange={(e) => setotpp(e.target.value)}
              placeholder="Enter Otp"
            />
            <input
              type="password"
              id="password"
              className="form-control mt-3"
              name="password"
              onBlur={(e) => handler(e)}
              placeholder="Password"
            />
            <input
              type="password"
              id="conpassword"
              className="form-control mt-3"
              name="conpassword"
              onBlur={(e) => handler(e)}
              placeholder="Confirm Password"
            />
            <button
              className=" btn btn-info mt-3"
              onClick={() => savepassword()}
            >
              Submit
            </button>
            <button
              style={{
                marginLeft: "200px",
                backgroundColor: "white",
                border: "0px",
                color: "green",
              }}
              onClick={() => sendOtp()}
            >
              Resend OTP
            </button>
          </Card.Body>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
