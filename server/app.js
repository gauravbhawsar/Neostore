const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const SecreteKey = "dskjvhsx9832y48y3sanc";
const DB = require("./Config/db");
const userRoutes = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const colourRoutes = require("./Routes/colourRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/colour", colourRoutes);
app.use("/api/order", orderRoutes);
DB();
const port = process.env.PORT || 5000;
const server = app.listen(
  port,
  console.log(`Server running on PORT ${port}...`)
);
