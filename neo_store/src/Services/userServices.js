import axios from "axios";
//api for register new user
export const Register = async (data) =>
  await axios.post("http://localhost:3001/api/user/register", data);
//api for authentication
export const login = async (data) =>
  await axios.post("http://localhost:3001/api/user/login", data);
//api for changing the password
export const changePassword = async (data) =>
  await axios.put("http://localhost:3001/api/user/changePassword", data);
//api for sending otp on user email
export const recoverPassword = async (data) =>
  await axios.post("http://localhost:3001/api/user/recoverPassword", data);
//api for savinf new password
export const saveNewPassword = async (data) =>
  await axios.put("http://localhost:3001/api/user/saveNewPassword", data);
//api for updating user profile
export const updateUser = async (data) =>
  await axios.put("http://localhost:3001/api/user/updateUser", data);
// api for getting user data
export const getUser = async (data) =>
  await axios.post("http://localhost:3001/api/user/getUser", data);
// api for updating user profile picture
export const updateProfile = async (data) =>
  axios.post("http://localhost:3001/api/user/updateProfile", data);
//api for updating user address
export const updateAddres = async (data) =>
  await axios.put("http://localhost:3001/api/user/updateAddres", data);
// api for updating cart
export const updateCart = async (data) =>
  await axios.put("http://localhost:3001/api/user/updateCart", data);
