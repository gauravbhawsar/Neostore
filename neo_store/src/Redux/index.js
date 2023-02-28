import { combineReducers, createStore } from "redux";

let initialstate = { name: "", profile: "", search: "" };
let initial = { count: 0 };
let cState = { cart: [] };
export const profileReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "updateProfile":
      return {
        name: action.payload,
        profile: state.profile,
        search: state.search,
      };

    case "updatePicture":
      return {
        profile: action.payload,
        name: state.name,
        search: state.search,
      };

    case "searchRedux":
      return {
        search: action.payload,
        profile: state.profile,
        name: state.name,
      };

    case "deleSearch":
      return {
        search: "",
      };
    default:
      return state;
  }
};
export const cartReducer = (state = initial, action) => {
  switch (action.type) {
    case "SetCart":
      return { count: action.payload };
    case "INC":
      return { count: action.payload };

    case "DEC":
      return { count: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ profileReducer, cartReducer });

const store = createStore(rootReducer);

export default store;
