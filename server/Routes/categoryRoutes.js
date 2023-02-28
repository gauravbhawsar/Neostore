const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategorys,
} = require("../Controllers/categorycontrolller");
router.post("/createCategory", createCategory);
router.get("/getCategorys", getCategorys);
module.exports = router;
