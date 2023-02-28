import axios from "axios";
// api for creating new order
export const createOrder = async (data) =>
  await axios.post("http://localhost:3001/api/order/createOrder", data);
//api for fetching all orders of perticulor user
export const getOrderByUser = async (data) =>
  await axios.post("http://localhost:3001/api/order/getOrderByUser", data);
// api for sending mail to user
export function sendEmail(data, email) {
  return axios.post(
    `http://localhost:3001/api/order/sendEmail/${email}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
