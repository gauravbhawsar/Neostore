const Product = require("../Schemas/Products_Schema");
//@description     get all poroducts
//@route           GET /api/products/getAllProducts
const getAllProducts = async (req, res) => {
  const allProduct = await Product.find().populate([
    "colour_id",
    "category_id",
  ]);
  if (allProduct) {
    res.json({
      error: 0,
      msg: "products got succesfully",
      allProducts: allProduct,
    });
  } else {
    res.json({ error: "1", msg: "something went wrong" });
  }
};

//@description     create new poroduct
//@route           POST /api/products/createProduct
const createProduct = async (req, res) => {
  const {
    name,
    image,
    price,
    colour_id,
    category_id,
    rating,
    description,
    subImages,
    features,
    quantity,
  } = req.body;
  const product = await Product.create({
    name,
    description,
    subImages,
    image,
    price,
    colour_id,
    category_id,
    rating,
    features,
    quantity,
    ratedBy: [],
  });
  if (product) {
    console.log(product);
    res.status(201).json({ error: "0", product });
  } else {
    res.json({ error: "1", msg: "something went wrong" });
  }
};
//@description     get products according to filter
//@route           POST /api/products/getfilterProducts
const getfilterProducts = async (req, res) => {
  let data = req.body;
  if (data.category != "" && data.colors.toString() != []) {
    Product.find({
      category_id: data.category,
      colour_id: data.colors,
    })
      .populate(["colour_id", "category_id"])
      .then((product) => {
        res.json({ product });
      });
  } else if (data.category != "") {
    Product.find({ category_id: data.category })
      .populate(["colour_id", "category_id"])
      .then((product) => res.json({ product }));
  } else if (data.colors.toString() != []) {
    Product.find({ colour_id: data.colors })
      .populate(["colour_id", "category_id"])
      .then((product) => res.json({ product }));
  } else {
    Product.find()
      .populate(["colour_id", "category_id"])
      .then((product) => res.json({ product }));
  }
};
//@description     get products according to price
//@route           POST /api/products/sortProductsByPrice
const sortProductsByPrice = async (req, res) => {
  let data = req.body;
  await Product.find()
    .sort({ price: data.sortBy })
    .populate(["colour_id", "category_id"])
    .then((product) => res.json({ product }));
};
//@description     get products according to rating
//@route           POST /api/products/sortProductsByRating
const sortProductsByRating = async (req, res) => {
  let data = req.body;
  await Product.find()
    .sort({ rating: data.sortBy })
    .populate(["colour_id", "category_id"])
    .then((product) => res.json({ product }));
};
//@description     updating product rating
//@route           PUT /api/products/rateProduct
const rateProduct = async (req, res) => {
  const { ratedBy, id } = req.body;
  let n = 0;
  ratedBy.forEach((ele) => {
    n += ele.rate;
  });
  let prating = n / ratedBy.length;

  await Product.findOneAndUpdate(
    { _id: id },
    { $set: { rating: prating, ratedBy: ratedBy } },
    { new: true }
  )
    .populate(["colour_id", "category_id"])
    .then((product) => res.json({ product }));
};

module.exports = {
  getAllProducts,
  createProduct,
  getfilterProducts,
  sortProductsByPrice,
  sortProductsByRating,
  rateProduct,
};
