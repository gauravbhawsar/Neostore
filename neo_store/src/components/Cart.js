import Footer from "./Footer";
import Navbar from "./Navbar";
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [gst, setGst] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let c = JSON.parse(localStorage.getItem("cart"));
    if (c) {
      setCart(c);
      calculation(c);
    }
  }, [count, total]);
  // funtion for calculating gst , totalprice of order
  const calculation = (c) => {
    let sum1 = 0;
    let t = 0;
    c.forEach((ele) => {
      sum1 += ele.price * ele.quantity;
      t += sum1;
      setSubTotal(t);

      sum1 = 0;
    });
    setGst((t * 5) / 100);
    setTotal(t + gst);
  };
  // function for increasing the quantity of product in cart
  const incremet = (obj) => {
    cart.forEach((ele) => {
      if (ele._id === obj._id) {
        ele.quantity = ele.quantity + 1;
        setCart(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });
    setCount(count + 1);
  };
  // function for decreasing the quantity of product in cart
  const decrement = (obj) => {
    cart.forEach((ele) => {
      if (ele._id === obj._id) {
        ele.quantity = ele.quantity - 1;
        setCart(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });
    if (cart.length) {
      setSubTotal(0);
      setGst(0);
      setTotal(0);
    }
    setCount(count + 1);
  };
  // function for deleting the product in cart
  const delepro = (i) => {
    cart.splice(i, 1);
    dispatch({
      type: "DEC",
      payload: cart.length,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    setCount(count + 1);
  };
  // function for authentication, if logged in then only user can go further
  const check = () => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/checkOut", { state: { cart: cart, total: total } });
    } else {
      if (window.confirm("please login")) {
        navigate("/login");
      } else {
      }
    }
  };
  return (
    <div>
      <Navbar />
      <div className="row mt-5" style={{ marginBottom: "50px" }}>
        <div className="col-7 ml-5">
          <table
            className="table"
            style={{
              border: "1px solid",
              padding: "10px",
              boxShadow: "5px 8px 10px 5px #888888",
            }}
          >
            <thead>
              <tr>
                <th colSpan={2} scope="col">
                  Product
                </th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.map((ele, i) => (
                  <tr key={i}>
                    <td>
                      <img width="70px" height="70px" src={ele.image}></img>
                    </td>
                    <td>{ele.description.slice(0, 30)}</td>
                    <td>
                      <i
                        onClick={() => incremet(ele)}
                        style={{ color: "green" }}
                        className="fa fa-plus-circle"
                      ></i>
                      {ele.quantity}
                      {ele.quantity == 1 ? (
                        " "
                      ) : (
                        <i
                          onClick={() => decrement(ele)}
                          style={{ color: "red" }}
                          className="fa fa-minus-circle"
                        ></i>
                      )}
                    </td>
                    <td>{ele.price}</td>
                    <td>{ele.price * ele.quantity}</td>
                    <td>
                      <i
                        onClick={() => delepro(i)}
                        style={{ color: "red" }}
                        className="fa fa-trash"
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-3">
          <div
            className="p-2"
            style={{
              fontWeight: "bold",
              padding: "4px",
              boxShadow: "2px 3px 3px 2px #888888",
            }}
          >
            <h4>Review Order</h4>

            <p>
              Subtotal
              <span style={{ marginLeft: "160px" }}>{subtotal}</span>{" "}
            </p>
            <hr></hr>
            <p>
              GST(5%) <span style={{ marginLeft: "160px" }}>{gst}</span>{" "}
            </p>
            <hr></hr>
            <p>
              Order Total <span style={{ marginLeft: "140px" }}>{total}</span>
            </p>
            <button
              onClick={() => check()}
              style={{ width: "100%" }}
              className="btn  btn-primary "
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
