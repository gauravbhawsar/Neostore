import React from "react";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import jwtDecode from "jwt-decode";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Account = () => {
  const uProfile = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(uProfile);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      let decode = jwtDecode(token);
      dispatch({
        type: "updateProfile",
        payload: decode.data.firstName + " " + decode.data.lastName,
      });
      dispatch({ type: "updatePicture", payload: decode.data.profile });
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="Conatiner">
        <h3 className="mt-2 pl-5">My Account</h3>
        <hr></hr>
        <div className="row">
          <div className="pt-5 col-3">
            <div>
              {" "}
              {uProfile.profile ? (
                <img
                  style={{ borderRadius: "50%", marginLeft: "70px" }}
                  height="200px"
                  width="200px"
                  src={`../images/${uProfile.profile}`}
                ></img>
              ) : (
                <img
                  style={{ borderRadius: "50%", marginLeft: "70px" }}
                  height="200px"
                  width="200px"
                  src="../images/default_profile.jpg"
                ></img>
              )}
            </div>
            <h4 className="text-center mt-3">{uProfile.name}</h4>
            <ul className="text-center mr-4 mt-4" style={{ listStyle: "none" }}>
              <li className="ull fa fa-shopping-cart">
                <Link
                  style={{ fontWeight: "bold", color: "black" }}
                  to="orders"
                >
                  Orders
                </Link>
              </li>
              <br></br>
              <li className="fa fa-user-circle">
                {" "}
                <Link
                  style={{ fontWeight: "bold", color: "black" }}
                  to="profile"
                >
                  Profile
                </Link>
              </li>
              <br></br>
              <li className="fa fa-address-card">
                {" "}
                <Link
                  style={{ fontWeight: "bold", color: "black" }}
                  to="address"
                >
                  Address
                </Link>
              </li>
              <br></br>
              <li className="fa fa-exchange">
                {" "}
                <Link
                  style={{ fontWeight: "bold", color: "black" }}
                  to="changePassword"
                >
                  Change Password
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-9">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
