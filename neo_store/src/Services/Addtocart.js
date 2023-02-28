// adding a perticular product to cart
import { useDispatch } from "react-redux";
export const AddToCart = (props) => {
  const dispatch = useDispatch();
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart) {
    if (cart.find((ele) => ele._id === props._id) != undefined) {
      console.log(ele);
      cart.forEach((ele) => {
        console.log(cart);
        if (ele._id === props._id) {
          console.log(ele.quantity);
          ele.quantity = ele.quantity + 1;
        }
      });
    } else {
      cart.push(props);
      dispatch({
        type: "INC",
        payload: cart.length,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    let newCart = [];
    newCart.push(props);
    dispatch({
      type: "INC",
      payload: newCart.length,
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
  }
};
