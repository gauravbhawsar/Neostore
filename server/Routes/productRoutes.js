const express = require("express");
const {
  getAllProducts,
  createProduct,
  getfilterProducts,
  sortProductsByRating,
  sortProductsByPrice,
  rateProduct,
} = require("../Controllers/productsController");
const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.post("/createProduct", createProduct);
router.post("/getfilterProducts", getfilterProducts);
router.post("/sortProductsByPrice", sortProductsByPrice);
router.post("/sortProductsByRating", sortProductsByRating);
router.put("/rateProduct", rateProduct);
module.exports = router;
