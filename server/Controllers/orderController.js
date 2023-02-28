const Order = require("../Schemas/Orders_Schema");

const createOrder = (req, res) => {
  const { totalPrice, email, products, address } = req.body;
  Order.create(
    {
      address: address,
      totalPrice: totalPrice,
      userEmail: email,
      productDetails: products,
    },
    (err, data) => {
      if (err) {
        res.json({ error: 1, msg: "something went wrong" });
      } else {
        res.json({ error: 0, msg: "order created succesfully" });
      }
    }
  );
};

const getOrderByUser = async (req, res) => {
  const { email } = req.body;
  await Order.find({ email }, (err, data) => {
    if (err) {
      res.json({ error: 1, msg: "something went wrong" });
    } else {
      res.json({ error: 0, orders: data });
    }
  });
};

module.exports = { createOrder, getOrderByUser };
