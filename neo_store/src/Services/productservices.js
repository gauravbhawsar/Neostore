import axios from "axios";
//api for fetching all products
export const getAllProducts = async (data) =>
  await axios.get("http://localhost:3001/api/products/getAllProducts");
//api for fetching all categorys
export const getCategorys = async (data) =>
  await axios.get("http://localhost:3001/api/category/getCategorys");
//api for fetching all colours
export const getColours = async (data) =>
  await axios.get("http://localhost:3001/api/colour/getColours");
//api for fetching all products according to filter
export const getfilterProducts = async (data) =>
  await axios.post(
    "http://localhost:3001/api/products/getfilterProducts",
    data
  );
//api for fetching all products according to rating
export const sortProductsByRating = async (data) =>
  await axios.post(
    "http://localhost:3001/api/products/sortProductsByRating",
    data
  );
//api for fetching all products by price
export const sortProductsByPrice = async (data) =>
  await axios.post(
    "http://localhost:3001/api/products/sortProductsByPrice",
    data
  );
//api for rating the product
export const rateProduct = async (data) =>
  await axios.put("http://localhost:3001/api/products/rateProduct", data);
