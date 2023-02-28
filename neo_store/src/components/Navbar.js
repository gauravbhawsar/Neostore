import React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Button } from "@material-ui/core";
import { updateCart } from "../Services/userServices";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      marginLeft: "4%",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(30),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      marginRight: "3%",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Navbar = () => {
  const [search, setSearch] = useState("");
  const cState = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const [log, setLog] = useState("");
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setLog("Logout");
    } else {
      setLog("Login");
    }
  }, []);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    navigate("/account");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  // function for delete, updating user data when user logout
  const userLog = () => {
    if (log === "Logout") {
      let token = localStorage.getItem("token");
      let decode = jwt_decode(token);
      localStorage.removeItem("token");
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        let formData = {
          email: decode.data.email,
          cart: cart,
        };
        updateCart(formData);
        localStorage.removeItem("cart");
        dispatch({
          type: "SetCart",
          payload: 0,
        });
      }
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  const dispatcher = () => {
    dispatch({
      type: "searchRedux",
      payload: search,
    });
    document.getElementById("search").value = "";
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={() => userLog()}>{log}</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      x{" "}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <div>
      <div className={classes.grow}>
        <AppBar style={{ backgroundColor: "black" }} position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Neo<span style={{ color: "red" }}>Store</span>
            </Typography>
            <div
              style={{
                position: "relative",
                marginLeft: "10%",
                marginRight: "2%",
                width: "auto",
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  display: "inline-block",
                  marginRight: "40px",
                }}
                to="/"
              >
                Home
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  display: "inline-block",
                  marginLeft: "40px",
                }}
                to="/product"
              >
                Products
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  display: "inline-block",
                  marginLeft: "80px",
                }}
                to="/account/orders"
              >
                Order
              </Link>
            </div>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                id="search"
                placeholder="Search…"
                onChange={(event) => setSearch(event.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <Button onClick={() => dispatcher()} style={{ color: "white" }}>
              Search
            </Button>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                onClick={() => navigate("/cart")}
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={cState.count} color="secondary">
                  Cart <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </div>
  );
};

export default Navbar;
