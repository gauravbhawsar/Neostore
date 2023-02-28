const express = require("express");
const router = express.Router();
const { addColour, getColours } = require("../Controllers/colourcontrolller");
router.post("/addColour", addColour);
router.get("/getColours", getColours);
module.exports = router;
