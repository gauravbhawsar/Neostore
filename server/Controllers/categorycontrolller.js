const Category = require("../Schemas/Category_Schema");

const createCategory = async (req, res) => {
  const { name, createdAt } = req.body;
  let cat = await Category.create({ name, createdAt });
  if (cat) {
    res.json({ error: 0, msg: "cat added" });
  } else {
    res.json({ error: 1, msg: "somethingwent wrong" });
  }
};
const getCategorys = async (req, res) => {
  let cats = await Category.find();
  if (cats) {
    res.json({ error: 0, category: cats });
  } else {
    res.json({ error: 1, msg: "something went wrong" });
  }
};

module.exports = { createCategory, getCategorys };
