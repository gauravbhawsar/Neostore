import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./home.css";
import { getAllProducts } from "../Services/productservices";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //calling api to fetch all the products
    getAllProducts().then((res) => {
      setProducts(res.data.allProducts);
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        dispatch({
          type: "SetCart",
          payload: cart.length,
        });
      }
    });
  }, []);
  // function for adding perticulor product in cart
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
  //function for ratings of products
  const starrating = (ele) => {
    return {
      edit: false,
      color: "rgba(20,20,20,0.1)",
      activeColor: "gold",
      size: window.innerWidth < 600 ? 20 : 25,
      value: ele.rating,
      isHalf: true,
    };
  };

  return (
    <>
      <Navbar />
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div style={{ width: "100%", height: "80%" }}>
            <div className="carousel-item active">
              <img
                src="https://q7x6p2k8.rocketcdn.me/wp-content/uploads/2021/06/ecommerce-seo.png"
                alt="First slide"
                style={{ width: "100%", height: "35rem" }}
              />
              <Link to="product" className="seeMore">
                {" "}
                See More...
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    ></path>
                  </svg>
                </div>
              </Link>
            </div>

            <div className="carousel-item">
              <img
                src="https://idus-media.di91.com/media/wysiwyg/Bed.jpg"
                alt="Second slide"
                style={{ width: "100%", height: "35rem" }}
              />
              <Link to="product" className="seeMore">
                {" "}
                See More...
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    ></path>
                  </svg>
                </div>
              </Link>
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1618221999490-9418f64786aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODR8fGRlc2t8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="Third slide"
                style={{ width: "100%", height: "35rem" }}
              />
              <Link to="/product" className="seeMore">
                {" "}
                See More...
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    ></path>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      <div className="text-center mt-4">
        <h2>Popular Products</h2>
        <Link to="/product" className="text-dark">
          View All
        </Link>
      </div>

      <div className="container d-flex justify-content-center">
        <div className="row">
          {products &&
            products.slice(7, 12).map((ele, i) => (
              <div key={ele._id} className="col my-3">
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    onClick={() =>
                      navigate("/productDetails", {
                        state: { product: ele },
                      })
                    }
                    src={ele.image}
                    height="350"
                  />
                  <Card.Body style={{ backgroundColor: "##f6f6f6" }}>
                    <Card.Title> {ele.name}</Card.Title>
                    <Card.Text>
                      <i
                        className="fa fa-inr mx-2"
                        style={{ color: "gold" }}
                      ></i>
                      <span className="font-weight-bold">{ele.price}</span>
                      <br></br>
                      <ReactStars {...starrating(ele)} />
                      <div className="d-flex justify-content-center mt-3">
                        <button
                          className="btn btn-danger"
                          onClick={() => addToCart(ele)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
