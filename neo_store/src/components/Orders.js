import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { getOrderByUser } from "../Services/orderServices";
import { Card } from "react-bootstrap";
const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("token");
    let decode = jwtDecode(token);
    if (token) {
      getOrderByUser(decode.data.email).then((res) => {
        if (res.data.error === 0) {
          setOrders(res.data.orders);
        }
      });
    } else {
      navigate("/products");
    }
  }, []);
  return (
    <div className="container">
      <Card style={{ width: "150ch" }} className="my-3">
        <Card.Body>
          <Card.Title className="fontWeight-bold">Your Orders</Card.Title>
          <hr></hr>
          {orders &&
            orders.map((od) => (
              <div key={od._id}>
                <div
                  style={{
                    width: "40%",
                    border: "grey 1px solid",
                    padding: "10px",
                  }}
                >
                  <span>Products : </span>
                  {od.productDetails.map((p) => (
                    <span>{p.name}, </span>
                  ))}
                  <br></br>
                  <span>
                    Total Price :{" "}
                    <span style={{ color: "green" }}>{od.totalPrice}</span>{" "}
                  </span>
                  <br></br>
                  <span>Address: {od.address}</span>
                  <button
                    className="btn btn-info mt-3"
                    onClick={() =>
                      navigate("/preview", { state: { order: od } })
                    }
                  >
                    Preview Invoice
                  </button>
                </div>
                <br></br>
              </div>
            ))}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Orders;
