import React from "react";
import NavBar from "./Navbar";
import swal from "sweetalert";
import Footer from "./Footer";
import { rateProduct } from "../Services/productservices";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import SocialMediaButtons from "./SocialMediaButtons";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactImageMagnify from "react-image-magnify";
import ReactStars from "react-stars";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [index, setIndex] = useState(0);
  const [colour, setColour] = useState("");
  const [value, setValue] = useState("1");
  const [email, setEmail] = useState("");
  let location = useLocation();
  useEffect(() => {
    setProduct(location.state.product);
    setColour(location.state.product.colour_id.colorName);
    let token = localStorage.getItem("token");
    let decode = jwtDecode(token);
    setEmail(decode.data.email);
  }, []);
  // fun for adding product in cart
  const addToCart = (obj) => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (cart) {
      if (cart.find((ele) => ele._id === obj._id) != undefined) {
        cart.forEach((ele) => {
          console.log(cart);
          if (ele._id === obj._id) {
            console.log(ele.quantity);
            ele.quantity = ele.quantity + 1;
          }
        });
      } else {
        cart.push(obj);
        dispatch({
          type: "INC",
          payload: cart.length,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      let newCart = [];
      newCart.push(obj);
      dispatch({
        type: "INC",
        payload: newCart.length,
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // function for printing stars according to the product rating
  const rating = (ele) => {
    return {
      edit: false,
      color: "rgba(20,20,20,0.1)",
      activeColor: "gold",
      size: window.innerWidth < 600 ? 20 : 25,
      value: ele.rating,
      isHalf: true,
    };
  };
  // function for get rating from user
  const rateproduct = {
    size: 20,
    count: 5,
    color: "black",
    activeColor: "red",
    value: 7.5,
    a11y: true,
    isHalf: true,
    emptyIcon: <BsStarFill />,
    halfIcon: <BsStarHalf />,
    filledIcon: <BsStarFill />,
    onChange: (newValue) => {
      chngeRating(newValue);
    },
  };
  // api call for updating product rating
  const chngeRating = (value) => {
    if (email) {
      let rating = product.ratedBy;
      if (rating.find((ele) => ele.name === email) != undefined) {
        rating.forEach((el) => {
          if (el.name === email) {
            el.rate = value;
          }
        });
      } else {
        let data = { name: email, rate: value };
        rating.push(data);
      }

      let formData = {
        ratedBy: rating,
        id: product._id,
      };
      rateProduct(formData).then((res) => {
        console.log(res.data.product);
        setProduct(res.data.product);
      });
      // alert("thanks for the rating")
      swal({
        icon: "success",
        title: "Thanks for Rating...",
      });
    } else {
      swal({
        icon: "warning",
        title: "you have to login first",
      });
    }
  };
  return (
    <div>
      <NavBar />
      <div className="row">
        <div className="col-7 mt-5">
          <div style={{ width: "50%", hegiht: "40%" }}>
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "product image",
                  isFluidWidth: true,
                  src: `${location.state.product.subImages[index]}`,
                },
                largeImage: {
                  src: `${location.state.product.subImages[index]}`,
                  width: 500,
                  height: 400,
                },
              }}
            />
          </div>
        </div>
        <div className="col-3 mt-5">
          <h3>{location.state.product.name}</h3>
          <ReactStars {...rating(product)} />
          <hr></hr>
          <h6>
            Price:{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>
              <i className="fa fa-inr mx-2"></i>
              {location.state.product.price}
            </span>
          </h6>
          <h6>
            Colour:{" "}
            {colour ? (
              <div
                style={{
                  display: "inline-block",
                  width: "30px",
                  height: "20px",
                  backgroundColor: `${colour}`,
                }}
              ></div>
            ) : (
              ""
            )}
          </h6>
          <h4>
            <i className="fa fa-share-alt"></i>
          </h4>
          <SocialMediaButtons />
          <Button
            onClick={() => addToCart(location.state.product)}
            className="mt-3"
          >
            Add to cart
          </Button>
          <span>&nbsp;&nbsp;</span>
          <button className="btn btn-dark">
            Rate Product
            <ReactStars {...rateproduct} />
          </button>
        </div>

        <div className="row">
          <div className="col lg-6 md-6 sm-12 my-4 ml-3">
            {location.state.product.subImages.map((p, i) => (
              <img
                src={p}
                onClick={() => setIndex(i)}
                height="100"
                width="100"
              />
            ))}
          </div>
        </div>

        <div className="container">
          <hr></hr>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Descriptoin" value="1" />
                  <Tab label="Features" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {location.state.product.description}
              </TabPanel>
              <TabPanel value="2">{location.state.product.features}</TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
