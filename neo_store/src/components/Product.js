import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReactPaginate from "react-paginate";
import ReactStars from "react-rating-stars-component";
import {
  getAllProducts,
  getCategorys,
  getColours,
  getfilterProducts,
  sortProductsByRating,
  sortProductsByPrice,
} from "../Services/productservices";
import { Card, Button } from "react-bootstrap";
import { Typography } from "@material-ui/core";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

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
const Product = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [colours, setColours] = useState([]);
  const [fcolor, setFcolor] = useState([]);
  const [fcategory, setFcategory] = useState("");
  const searchState = useSelector((state) => state.profileReducer);
  const navigate = useNavigate();
  useEffect(() => {
    //calling api for fetching all the products
    getAllProducts().then((res) => {
      setProducts(res.data.allProducts);
    });
    // calling api for fetching all the Categorys
    getCategorys().then((res) => {
      setCategorys(res.data.category);
    });
    // calling api for fetching all the Colours
    getColours().then((res) => {
      setColours(res.data.colours);
    });
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      dispatch({
        type: "SetCart",
        payload: cart.length,
      });
    }
  }, []);
  // calling api getfilterProducts for getting products according to the filter
  const filter = () => {
    let formData = {
      category: fcategory,
      colors: fcolor,
    };
    getfilterProducts(formData).then((res) => {
      setProducts(res.data.product);
    });
  };
  // for reseting the filter , to show all products again
  const clearFilter = () => {
    if (fcolor != []) {
      fcolor.map((ele) => {
        document.getElementById(ele).checked = false;
      });
      setFcolor([]);
    }
    if (fcategory != "") {
      document.getElementById(fcategory).checked = false;
      setFcategory("");
    }
    dispatch({
      type: "deleSearch",
      payload: "",
    });
    getAllProducts().then((res) => {
      setProducts(res.data.allProducts);
    });
  };
  // api call for products sorted by ratings
  const filterProductsByRating = (order) => {
    let data = {
      sortBy: order,
    };
    sortProductsByRating(data).then((res) => setProducts(res.data.product));
  };
  // api call for products sorted by price
  const filterProductsByPrice = (order) => {
    let data = {
      sortBy: order,
    };
    sortProductsByPrice(data).then((res) => setProducts(res.data.product));
  };
  // adding a perticular product to cart
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
  function Items({ currentItems }) {
    return (
      <>
        <div className="row">
          {currentItems &&
            currentItems
              .filter((el) => {
                if (
                  el.name
                    .toLowerCase()
                    .includes(searchState.search.toLowerCase())
                ) {
                  return el;
                }
              })
              .map((ele) => (
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
                        <ReactStars {...rating(ele)} />
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
      </>
    );
  }
  // fucntion for pagination
  function PaginatedItems({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(products.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(products.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
      const pageNo = (event.selected * itemsPerPage) % products.length;
      setItemOffset(pageNo);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }
  return (
    <div>
      <div>
        <Navbar />
        <div className="row">
          <div className="col lg-2 md-4 sm-12 pl-5 mt-5">
            <ul className="nav flex-column">
              <li className="nav-item">
                <button
                  onClick={() => clearFilter()}
                  className="nav-link  btn btn-danger w-100"
                >
                  All Products
                </button>
              </li>
            </ul>
            <Accordion className="my-3">
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Categories</Typography>
                <i
                  style={{ marginLeft: "180px" }}
                  className="fa fa-chevron-down"
                ></i>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {categorys &&
                    categorys.map((cat) => (
                      <div key={cat._id}>
                        {cat.name}
                        <input
                          type="radio"
                          id={cat._id}
                          onClick={(e) => setFcategory(e.target.value)}
                          name="categories"
                          value={cat._id}
                        />
                        <br></br>
                      </div>
                    ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Colors</Typography>
                <i
                  style={{ marginLeft: "210px" }}
                  className="fa fa-chevron-down"
                ></i>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {colours &&
                    colours.map((col) => (
                      <div key={col._id}>
                        {col.colorName}

                        <input
                          type="checkbox"
                          name="color"
                          onClick={(e) =>
                            setFcolor([...fcolor, e.target.value])
                          }
                          id={col._id}
                          value={col._id}
                        />
                        <br></br>
                      </div>
                    ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <div className="mt-4">
              <Button
                className="fa fa-filter btn btn-warning"
                onClick={() => filter()}
              >
                Filter
              </Button>
              <Button
                className="ml-4 fa fa-filter btn btn-danger"
                onClick={() => clearFilter()}
              >
                Clear Filter
              </Button>
            </div>
          </div>

          <div className="col-9">
            <div className="row mt-3">
              <div className="col-7"></div>
              <div className="col-4">
                <div
                  className="container text-right mt-2"
                  style={{ paddingRight: 70 }}
                >
                  Sort By :{" "}
                  <i className="fa fa-star mx-2" style={{ color: "gold" }}></i>
                  <i
                    className="fa fa-arrow-up mx-2"
                    style={{ color: "blue" }}
                    onClick={() => filterProductsByRating(-1)}
                  ></i>
                  <i
                    className="fa fa-arrow-down mx-2"
                    style={{ color: "blue" }}
                    onClick={() => filterProductsByRating(1)}
                  ></i>
                </div>
                <div
                  className="container text-right mt-2"
                  style={{ paddingRight: 70 }}
                >
                  Sort By :{" "}
                  <i className="fa fa-inr mx-2" style={{ color: "gold" }}></i>
                  <i
                    className="fa fa-arrow-up mx-2"
                    style={{ color: "blue" }}
                    onClick={() => filterProductsByPrice(-1)}
                  ></i>
                  <i
                    className="fa fa-arrow-down mx-2"
                    style={{ color: "blue" }}
                    onClick={() => filterProductsByPrice(1)}
                  ></i>
                </div>
              </div>
            </div>

            <PaginatedItems itemsPerPage={6} />
          </div>
        </div>
        <Footer />{" "}
      </div>
    </div>
  );
};

export default Product;
