const express = require("express");
const User = require("../Schemas/User_Schema");
const generateToken = require("../config/generateToken");

const multer = require("multer");
const {
  registerUser,
  authUser,
  updateUser,
  saveNewPassword,
  recoverPassword,
  changePassword,
  getUser,
  updateAddres,
  updateCart,
} = require("../Controllers/userController");
const DIR = "../neo_store/public/images/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, "user" + "_" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/getUser", getUser);
router.put("/updateUser", updateUser);
router.put("/updateAddres", updateAddres);
router.put("/saveNewPassword", saveNewPassword);
router.post("/recoverPassword", recoverPassword);
router.put("/changePassword", changePassword);
router.put("/updateCart", updateCart);
router.post("/updateProfile", upload.single("profileImg"), (req, res) => {
  console.log(req.file, "line 51");
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        profile: req.file.filename,
      },
    },
    { new: true },
    (err, data) => {
      if (err) throw err;
      else {
        console.log(data, "line 63");
        const token = generateToken(data);
        res.json({
          err: 0,
          msg: "Profile Pic Updated",
          token: token,
          values: data,
        });
      }
    }
  );
});
module.exports = router;
