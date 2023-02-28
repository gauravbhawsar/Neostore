import React from "react";
import { Card, Modal, Button } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateUser, getUser, updateProfile } from "../Services/userServices";
import moment from "moment";
const regForMobile = RegExp("^[0-9]{10}$");
const regForName = RegExp(/^[a-zA-Z]/);

const Profile = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    firstName: null,
    lastName: null,
    email: null,
    gender: null,
    mobileNo: null,
    dob: null,
    profile: null,
    errors: {
      firstName: "",
      lastName: "",
      mobileNo: "",
    },
  });
  useEffect(() => {
    let token = localStorage.getItem("token");
    let decode = jwt_decode(token);
    setState({
      ...state,
      email: decode.data.email,
      firstName: decode.data.firstName,
      lastName: decode.data.lastName,
      gender: decode.data.gender,
      mobileNo: decode.data.mobileNo,
      dob: decode.data.dob,
    });
  }, []);
  // validater function, for checking user details
  const handler = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;

    switch (name) {
      case "firstName":
        errors.firstName = regForName.test(value) ? "" : "Invalid first Name";
        break;
      case "lastName":
        errors.lastName = regForName.test(value) ? "" : "Invalid last Name";
        break;
      case "mobileNo":
        errors.mobileNo = regForMobile.test(value) ? "" : "Invalid Mobile No.";
        break;
      default:
        return "";
    }
    setState({ ...state, [name]: value });
  };
  // function for updating user profile data
  const updateProfilee = async () => {
    const formData = {
      firstName: state.firstName,
      lastName: state.lastName,
      gender: state.gender,
      mobileNo: state.mobileNo,
      dob: state.dob,
      email: state.email,
    };
    if (validate(state.errors)) {
      updateUser(formData).then((res) => {
        if (res.data.error === 0) {
          dispatch({
            type: "updateProfile",
            payload: state.firstName + " " + state.lastName,
          });
          localStorage.setItem("token", res.data.token);
          setShow({ show: false });
        }
      });

      if (show) {
        let data = { email: state.email };
        getUser(data);
      }
    } else {
      alert("Somthing went wrong");
    }
  };
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);
  // function for updating user profile picture
  const updateProfilePic = (e) => {
    const formData = new FormData();
    formData.append("profileImg", state.profile);
    formData.append("email", state.email);
    updateProfile(formData).then((res) => {
      dispatch({
        type: "updatePicture",
        payload: res.data.values.profile,
      });
      localStorage.setItem("token", res.data.token);
    });
    setShow({ show: false });
  };
  return (
    <>
      <div className="container">
        <Card style={{ width: "83ch" }} className="my-3">
          <Card.Body>
            <Card.Title className="fontWeight-bold">Profile</Card.Title>
            <hr></hr>
            <table style={{ backgroundColor: "white" }}>
              <tbody>
                <tr style={{}}>
                  <td style={{ fontWeight: "bold", paddingTop: "25px" }}>
                    First Name
                  </td>
                  <td style={{ paddingLeft: "250px", paddingTop: "25px" }}>
                    {state.firstName}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", paddingTop: "25px" }}>
                    Last Name
                  </td>
                  <td style={{ paddingLeft: "250px", paddingTop: "25px" }}>
                    {state.lastName}
                  </td>
                </tr>
                <tr style={{ border: "white" }}>
                  <td style={{ fontWeight: "bold", paddingTop: "25px" }}>
                    Gender
                  </td>
                  <td style={{ paddingLeft: "250px", paddingTop: "25px" }}>
                    {state.gender}
                  </td>
                </tr>
                <tr style={{ border: "white" }}>
                  <td style={{ fontWeight: "bold", paddingTop: "25px" }}>
                    Date of Birth
                  </td>
                  <td style={{ paddingLeft: "250px", paddingTop: "25px" }}>
                    {moment(state.dob).format("MMM Do YYYY")}
                  </td>
                </tr>
                <tr style={{ border: "white" }}>
                  <td style={{ fontWeight: "bold", paddingTop: "25px" }}>
                    Mobile No.
                  </td>
                  <td style={{ paddingLeft: "250px", paddingTop: "25px" }}>
                    {state.mobileNo}
                  </td>
                </tr>
              </tbody>
            </table>
            <hr></hr>
            <button className="btn btn-info mt-3" onClick={handleShow}>
              Edit
            </button>
          </Card.Body>
        </Card>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "whitesmoke" }}>
          <div className="row">
            <div className="col">
              <Card.Text>
                First Name :{" "}
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={state.firstName}
                  onChange={handler}
                />
                <span className="text-danger">{state.errors.firstName}</span>
              </Card.Text>
            </div>
            <div className="col">
              <Card.Text>
                Last Name :{" "}
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={state.lastName}
                  onChange={handler}
                />
                <span className="text-danger">{state.errors.lastName}</span>
              </Card.Text>
            </div>
          </div>

          <Card.Text>
            Contact Number :{" "}
            <input
              type="text"
              className="form-control"
              name="mobileNo"
              value={state.mobileNo}
              onChange={handler}
            />
            <span className="text-danger">{state.errors.mobileNo}</span>
          </Card.Text>

          <Card.Text>
            Gender : &nbsp;
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onClick={(event) =>
                setState({ ...state, gender: event.target.value })
              }
            />{" "}
            <span className="mr-3"> Male</span>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onClick={(event) =>
                setState({ ...state, gender: event.target.value })
              }
            />{" "}
            <span className="mr-3"> Female</span>
          </Card.Text>
          <Modal.Footer style={{ backgroundColor: "whitesmoke" }}>
            <button
              className="btn btn-info"
              variant="primary"
              onClick={() => updateProfilee()}
            >
              Save Changes
            </button>
          </Modal.Footer>
          <Card.Text>
            Update Profile :{" "}
            <input
              type="file"
              className="form-control"
              name="profile"
              onChange={(event) =>
                setState({ ...state, profile: event.target.files[0] })
              }
            />
          </Card.Text>
          <Modal.Footer style={{ backgroundColor: "whitesmoke" }}>
            <button
              className="btn btn-info"
              variant="primary"
              onClick={() => updateProfilePic()}
            >
              Save Profile
            </button>
          </Modal.Footer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
