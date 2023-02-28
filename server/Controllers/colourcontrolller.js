const Colour = require("../Schemas/Colour_Schema");

const addColour = async (req, res) => {
  const { colorName } = req.body;
  let color = await Colour.create({ colorName });
  if (color) {
    res.json({ error: 0, msg: "Colour added" });
  } else {
    res.json({ error: 1, msg: "somethingwent wrong" });
  }
};
const getColours = async (req, res) => {
  let colours = await Colour.find();
  if (colours) {
    res.json({ error: 0, colours: colours });
  } else {
    res.json({ error: 1, msg: "somethinf went wrong" });
  }
};

module.exports = { addColour, getColours };
