import React from "react";
import SocialButton from "./SocialButton";
import swal from "sweetalert";

import { Card } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Register } from "../Services/userServices";
import Footer from "./Footer";
import NavbarFirst from "./NavbarFirst";
const regForMobile = RegExp("^[0-9]{10}$");
const regForName = RegExp(/^[a-zA-Z]/);

const regForEmail = RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
const regForpassword = RegExp(
  "^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,})"
);
export default function Registration() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    conpassword: null,
    gender: null,
    mobileNo: null,
    dob: null,
    errors: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      password: "",
      conpassword: "",
    },
  });
  // validetor function
  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    let errors = state.errors;

    switch (name) {
      case "firstName":
        errors.firstName = regForName.test(value) ? "" : "Invalid first Name";
        setState({ ...state, firstName: value });
        break;
      case "lastName":
        errors.lastName = regForName.test(value) ? "" : "Invalid last Name";
        setState({ ...state, lastName: value });
        break;

      case "email":
        errors.email = regForEmail.test(value) ? "" : "Invalid Email-Id";
        setState({ ...state, email: value });
        break;
      case "password":
        errors.password = regForpassword.test(value) ? "Invalid Email-Id" : "";
        setState({ ...state, password: value });
        break;
      case "conpassword":
        errors.conpassword =
          state.password === value ? "" : "password is not matched";
        break;
      case "mobileNo":
        errors.mobileNo = regForMobile.test(value) ? "" : "Invalid Mobile No.";
        setState({ ...state, mobileNo: value });
        break;
      default:
        return alert("form validated");
    }
    setState({ ...state, [name]: value });
  };
  // api call for registering new user in db
  const formSubmit = async (event) => {
    const formData = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
      gender: state.gender,
      address: [],
      mobileNo: state.mobileNo,
      dob: state.dob,
      cart: [],
    };
    if (validate(state.errors)) {
      // console.log(formData);
      Register(formData).then((res) => res.data);
      swal({ text: "Registerd Successfully", icon: "success" });
      navigate("/login");
    } else {
      swal({ text: "Invalid Details", icon: "warning" });
    }
  };
  // validetor function
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  // api call for registering new user through social login
  const handleSocialLogin = async (user) => {
    console.log(user);
    const FormData = {
      firstName: user._profile.firstName,
      lastName: user._profile.lastName,
      email: user._profile.email,
      password: "socialLogoin",
      address: [],
      dob: "",
      gender: "",
      mobileNo: 0,
      cart: [],
    };
    Register(FormData).then((res) => res.data);
    // console.log("new user");
    swal({ text: "Registerd Successfully", icon: "success" });
    navigate("/login");
  };
  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };
  const { errors } = state;
  return (
    <>
      <NavbarFirst />
      <div className="d-flex mt-3 ml-2 justify-content-center">
        <SocialButton
          provider="google"
          appId="420321224046-je2rf4df9mqcua73ve0usqqvrsoqvdi5.apps.googleusercontent.com"
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          className="btn btn-danger mb-3"
        >
          <i className="fa fa-google mr-1" />
          Register with Google
        </SocialButton>
        <SocialButton
          provider="facebook"
          appId="1308361419632866"
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          className="btn btn-primary mb-3"
        >
          <i className="fa fa-facebook mr-1"></i>
          Register With facebook
        </SocialButton>
      </div>
      <div className="d-flex justify-content-center">
        <Card
          style={{ width: "83ch", display: "flex", justifyContent: "center" }}
          className="my-3"
        >
          <Card.Body>
            <Card.Title className="text-center">
              Register to NeoSTORE
            </Card.Title>
            <Card.Text>
              <input
                type="text"
                id="firstName"
                className="form-control mt-3"
                name="firstName"
                onBlur={(e) => handler(e)}
                placeholder="First Name"
              />
              {errors.firstName.length > 0 && (
                <span style={{ color: "red" }}>{errors.firstName}</span>
              )}
              <input
                type="text"
                id="lastName"
                className="form-control mt-3"
                name="lastName"
                onBlur={(e) => handler(e)}
                placeholder="Last Name"
              />
              {errors.lastName.length > 0 && (
                <span style={{ color: "red" }}>{errors.lastName}</span>
              )}
              <input
                type="text"
                id="email"
                className="form-control mt-3"
                name="email"
                onBlur={(e) => handler(e)}
                placeholder="Email Address"
              />
              {errors.email.length > 0 && (
                <span style={{ color: "red" }}>{errors.email}</span>
              )}
              <input
                type="number"
                id="mobileNo"
                className="form-control mt-3"
                name="mobileNo"
                onBlur={(e) => handler(e)}
                placeholder="Mobile no."
              />
              {errors.mobileNo.length > 0 && (
                <span style={{ color: "red" }}>{errors.mobileNo}</span>
              )}
              <input
                type="password"
                id="password"
                className="form-control mt-3"
                name="password"
                onBlur={(e) => handler(e)}
                placeholder="Password"
              />
              {errors.password.length > 0 && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )}
              <input
                type="password"
                id="conpassword"
                className="form-control mt-3"
                name="conpassword"
                onBlur={(e) => handler(e)}
                placeholder="Confirm Password"
              />
              {errors.conpassword.length > 0 && (
                <span style={{ color: "red" }}>{errors.conpassword}</span>
              )}
              <input
                type="date"
                id="dob"
                className="form-control mt-3"
                name="dob"
                onBlur={(e) => setState({ ...state, dob: e.target.value })}
              />
              <input
                type="radio"
                id="male"
                name="gen"
                value="male"
                onClick={(e) => setState({ ...state, gender: e.target.value })}
              />{" "}
              Male
              <input
                type="radio"
                id="female"
                name="gen"
                value="female"
                onClick={(e) => setState({ ...state, gender: e.target.value })}
              />{" "}
              Female <br />
              <button
                className="btn btn-info mt-3"
                onClick={() => formSubmit()}
              >
                Register
              </button>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <Footer />
    </>
  );
}
