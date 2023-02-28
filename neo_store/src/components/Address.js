import { Modal, Button } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { Card } from "react-bootstrap";
import React from "react";
import { useState, useEffect } from "react";
import { updateAddres } from "../Services/userServices";
const regForAddress = RegExp(/^([A-Za-z]|[0-9]|[\w\s])+$/);
const regForPincode = RegExp(/^[1-9][0-9]{5}/);
const regForName = RegExp(/^[a-zA-Z]/);
const Address = () => {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(true);
  const [state, setState] = useState({
    addreses: [],
    ad_id: null,
    adress: null,
    pincode: null,
    city: null,
    state: null,
    country: null,
    errors: {
      adress: "",
      pincode: "",
      city: "",
    },
  });
  //function to close the model , a form for user data
  const handleClose = () => setShow(false);
  useEffect(() => {
    let token = localStorage.getItem("token");
    let decode = jwt_decode(token);
    setState({
      ...state,
      ad_id: "",
      email: decode.data.email,
      addreses: decode.data.address,
      adress: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
    });
  }, [count]);
  // function to show the model, form for user data
  const handleShow = (obj) => {
    if (obj._id) {
      setState({
        ...state,
        ad_id: obj._id,
        adress: obj.adress,
        pincode: obj.pincode,
        city: obj.city,
        state: obj.state,
        country: obj.country,
      });
    } else {
      setState({
        ...state,
        adress: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
      });
      setFlag(false);
    }

    setShow(true);
  };
  // function for validation all the feild values
  const handler = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;

    switch (name) {
      case "adress":
        errors.adress = regForAddress.test(value) ? "" : "Invalid address";
        break;
      case "pincode":
        errors.pincode = regForPincode.test(value) ? "" : "Invalid pincode";
        break;
      case "city":
        errors.city = regForName.test(value) ? "" : "Invalid city name";
        break;
      case "state":
        errors.state = regForName.test(value) ? "" : "Invalid state name";
        break;
      case "country":
        errors.country = regForName.test(value) ? "" : "Invalid country name";
        break;
      default:
        return "";
    }
    setState({ ...state, [name]: value });
  };
  // function for validation all the feild values
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  // api call for updating  and inserting a new address
  const updateAddress = async () => {
    if (validate(state.errors)) {
      let adess = {
        adress: state.adress,
        pincode: state.pincode,
        city: state.city,
        state: state.state,
        country: state.country,
      };
      let data = state.addreses;
      if (flag) {
        data.forEach((ob, i) => {
          if (ob._id === state.ad_id) {
            data[i] = adess;
          }
        });
      } else {
        data.push(adess);
      }
      let formData = {
        email: state.email,
        address: data,
      };
      updateAddres(formData).then((res) => {
        if (res.data.error === 0) {
          localStorage.setItem("token", res.data.token);
          setCount(count + 1);
          setState({
            ...state,
            adress: "",
            pincode: "",
            city: "",
            state: "",
            country: "",
          });
          setShow(!show);
          if (!flag) {
            setFlag(true);
          }
        }
      });
    } else {
      alert("check all the feilds");
    }
  };
  // api call for deleting address
  const deleteAddress = async (obj) => {
    let data = state.addreses;
    data.forEach((ob, i) => {
      if (ob._id === obj._id) {
        data.splice(i, 1);
      }
    });
    let formData = {
      email: state.email,
      address: data,
    };
    updateAddres(formData).then((res) => {
      if (res.data.error === 0) {
        setState({ ...state, addreses: data });
        localStorage.setItem("token", res.data.token);
      }
    });
  };
  return (
    <div className="container">
      <Card style={{ width: "83ch" }} className="my-3">
        <Card.Body>
          <Card.Title className="fontWeight-bold">Address</Card.Title>
          <hr></hr>
          {state.addreses.map((ad) => (
            <div key={ad._id}>
              <div
                style={{
                  width: "40%",
                  border: "grey 1px solid",
                  padding: "10px",
                }}
              >
                <p>{ad.adress}</p>

                <button
                  className="btn btn-info mt-3"
                  onClick={() => handleShow(ad)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger mt-3"
                  onClick={() => deleteAddress(ad)}
                >
                  delete
                </button>
              </div>
              <hr></hr>
            </div>
          ))}
          <button className="btn btn-info mt-3" onClick={handleShow}>
            Add new address
          </button>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Address</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "whitesmoke" }}>
          <div className="row">
            <div className="col">
              <Card.Text>
                Address :{" "}
                <input
                  type="text"
                  className="form-control"
                  name="adress"
                  value={state.adress}
                  onChange={handler}
                />
                <span className="text-danger">{state.errors.adress}</span>
              </Card.Text>
            </div>
            <div className="col">
              <Card.Text>
                Pincode :{" "}
                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  value={state.pincode}
                  onChange={handler}
                />
                <span className="text-danger">{state.errors.pincode}</span>
              </Card.Text>
            </div>
          </div>

          <Card.Text>
            City :{" "}
            <input
              type="text"
              className="form-control"
              name="city"
              value={state.city}
              onChange={handler}
            />
            <span className="text-danger">{state.errors.city}</span>
          </Card.Text>
          <Card.Text>
            Country :{" "}
            <input
              type="text"
              className="form-control"
              name="country"
              value={state.country}
              onChange={handler}
            />
            <span className="text-danger">{state.errors.country}</span>
          </Card.Text>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => updateAddress()}>
            save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Address;
