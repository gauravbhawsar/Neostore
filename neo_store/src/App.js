import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./components/Login"));
const Registration = lazy(() => import("./components/Registration"));
const Cart = lazy(() => import("./components/Cart"));
const CheckOut = lazy(() => import("./components/CheckOut"));
const RecoverPassword = lazy(() => import("./components/RecoverPassword"));
const Orders = lazy(() => import("./components/Orders"));
const Product = lazy(() => import("./components/Product"));
const Profile = lazy(() => import("./components/Profile"));
const Preview = lazy(() => import("./components/Preview"));
const Home = lazy(() => import("./components/Home"));
const Address = lazy(() => import("./components/Address"));
const Account = lazy(() => import("./components/Account"));
const ChangePassword = lazy(() => import("./components/ChangePassword"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
function App() {
  return (
    <div>
      <Router>
        <Suspense
          fallback={
            <img
              src="images/loading.gif"
              style={{ padding: "50px" }}
              width="100%"
              alt="..."
            ></img>
          }
        >
          <Routes>
            <Route
              exact
              path="/registration"
              element={<Registration />}
            ></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/account" element={<Account />}>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="address" element={<Address />}></Route>
              <Route path="orders" element={<Orders />}></Route>
              <Route path="changePassword" element={<ChangePassword />}></Route>
            </Route>
            <Route exact path="/product" element={<Product />}></Route>
            <Route exact path="/cart" element={<Cart />}></Route>
            <Route exact path="/checkOut" element={<CheckOut />}></Route>
            <Route exact path="/preview" element={<Preview />}></Route>
            <Route exact path="/" element={<Home />}></Route>
            <Route
              exact
              path="/productDetails"
              element={<ProductDetails />}
            ></Route>
            <Route
              exact
              path="/recoverPassword"
              element={<RecoverPassword />}
            ></Route>
            <Route
              path="*"
              element={
                <img
                  width="100%"
                  height="657px"
                  src="./images/notfound.gif"
                  alt="not found"
                />
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
