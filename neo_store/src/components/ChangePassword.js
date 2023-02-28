import React from "react";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { Card } from "react-bootstrap";
import { changePassword } from "../Services/userServices";
const regForpassword = RegExp(
  "^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,})"
);
const ChangePassword = () => {
  const [state, setState] = useState({
    email: null,
    oldPassword: null,
    newPassword: null,
    conpassword: null,
    errors: {
      newPassword: "",
      conpassword: "",
    },
  });
  useEffect(() => {
    let token = localStorage.getItem("token");
    let decode = jwtDecode(token);
    setState({
      ...state,
      email: decode.data.email,
    });
  }, []);
  // function for validation all the feild values
  const handler = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;

    switch (name) {
      case "newPassword":
        errors.newPassword = regForpassword.test(value)
          ? "Invalid password"
          : "";
        setState({ ...state, [name]: value });
        break;
      case "conpassword":
        errors.conpassword =
          state.newPassword === value ? "" : "password is not matched";
        break;
    }
    setState({ ...state, [name]: value });
  };
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  // api call for changing the password
  const checkdata = async () => {
    if (validate(state.errors)) {
      let formData = {
        email: state.email,
        oldPassword: state.oldPassword,
        newPassword: state.newPassword,
      };
      changePassword(formData).then((res) => {
        if (res.data.error === 0) {
          alert("password changed succsesfully");
        } else {
          alert("old password is not matched");
        }
      });
    }
  };
  return (
    <div className="container">
      <Card style={{ width: "50ch" }} className="my-3">
        <Card.Body>
          <Card.Title>Change Password</Card.Title>
          <input
            type="text"
            className="form-control mt-3"
            name="oldPassword"
            onChange={(e) =>
              setState({ ...state, oldPassword: e.target.value })
            }
            placeholder="Enter old Password"
          />
          <input
            type="password"
            className="form-control mt-3"
            name="newPassword"
            onBlur={(e) => handler(e)}
            placeholder="New Password"
          />
          <input
            type="password"
            className="form-control mt-3"
            name="conpassword"
            onBlur={(e) => handler(e)}
            placeholder="Confirm Password"
          />
          <button className=" btn btn-info mt-3" onClick={() => checkdata()}>
            Submit
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChangePassword;
