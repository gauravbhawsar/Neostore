const User = require("../Schemas/User_Schema");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

//@description     Register new user
//@route           POST /api/user/register
const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    address,
    email,
    password,
    mobileNo,
    dob,
    cart,
  } = req.body;
  console.log(req.body);
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
  }
  let hpassword = bcrypt.hashSync(password, saltRounds);
  const user = await User.create({
    firstName,
    lastName,
    gender,
    address,
    email,
    password: hpassword,
    mobileNo,
    dob,
    cart,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      // token: generateToken(user._id),
    });
  } else {
    res.status(400);
  }
};

//@description     Auth the user
//@route           POST /api/users/login

const authUser = async (req, res) => {
  let hashbcrypt = false;

  const { email, password } = req.body;

  await User.findOne({ email }, (err, data) => {
    if (err) {
      res.json({ error: "1", msg: "user not found" });
    } else {
      hashbcrypt = bcrypt.compareSync(password, data.password);
      if (hashbcrypt) {
        res.json({
          token: generateToken(data),
        });
      } else {
        res.json({ error: "0" });
      }
    }
  });
};
//@description     get user data
//@route           POST /api/users/fetUser
const getUser = async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    res.json({ error: 0, token: generateToken(user) });
  } else {
    res.json({ error: 1, msg: "user not foud" });
  }
};
//@description     update the user
//@route           PUT /api/users/updateUser
const updateUser = async (req, res) => {
  const { firstName, lastName, gender, email, mobileNo, dob, profile } =
    req.body;

  await User.findOneAndUpdate(
    { email },
    {
      $set: {
        firstName,
        lastName,
        gender,
        mobileNo,
        dob,
        profile,
      },
    },
    (err, data) => {
      if (err) {
        res.json({ error: 1, msg: "user not found" });
      } else {
        res.json({
          error: 0,
          msg: "user updated succesfully",
          token: generateToken(data),
        });
      }
    }
  );
};
//@description     send otp for password recovery
//@route           POST /api/users/recoverPassword
const recoverPassword = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  const otp = Math.floor(1000 + Math.random() * 9000);
  req.session = otp;
  console.log(req.session);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: "gauravbhawsar98@gmail.com",
      pass: process.env.password,
    },
  });
  let mailOptions = {
    from: "",
    to: email,
    subject: "Recover Password",
    text: `Dear Customer,
      please enter this otp ${otp} in the otp field to recover your password`,
  };
  transporter.sendMail(mailOptions, function (error, data) {
    if (error) {
      res.json({ err: 1, msg: "email not found" });
    } else {
      res.json({ error: 0, msg: "OTP sent", otp: otp });
      console.log("Email sent: " + data.response);
    }
  });
};
//@description     savinf new  password
//@route           PUT /api/users/saveNewPassword
const saveNewPassword = async (req, res) => {
  const { email, password, otp } = req.body;
  let hpassword = bcrypt.hashSync(password, saltRounds);
  await User.updateOne(
    { email },
    { $set: { password: hpassword } },
    (err, data) => {
      if (err) {
        res.json({ error: 1, msg: "user not found" });
      } else {
        res.json({ error: 0, msg: "password updated succesfully" });
      }
    }
  );
};
//@description     change password
//@route           PUT /api/users/changePassword
const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const userr = await User.findOne({ email });
  let pass = bcrypt.compareSync(oldPassword, userr.password);
  if (pass) {
    let hpassword = bcrypt.hashSync(newPassword, saltRounds);
    await User.updateOne(
      { email },
      { $set: { password: hpassword } },
      (err, data) => {
        if (!err) {
          res.json({
            error: 0,
            msg: " password updated succesfully",
          });
        }
      }
    );
  } else {
    res.json({ error: 1, msg: "Old password is not Matched" });
  }
};
const updateAddres = async (req, res) => {
  const { email, address } = req.body;
  await User.findOneAndUpdate(
    { email },
    { $set: { address } },
    { new: true },
    (err, data) => {
      if (err) {
        res.json({ error: 1, msg: "user Not Found" });
      } else {
        res.json({
          error: 0,
          msg: "address updated sucessfully",
          token: generateToken(data),
        });
      }
    }
  );
};
const updateCart = async (req, res) => {
  const { email, cart } = req.body;
  console.log(req.body);
  try {
    await User.findOneAndUpdate({ email }, { $set: { cart } }, { new: true });

    // (err) => {
    //   if (err) {
    //     res.json({ error: 1, msg: "something went wrong" });
    //   } else {
    //     res.json({ error: 0, msg: "cart updated succesfully" });
    //   }
    // }
    res.json({ error: 0, msg: "cart updated succesfully" });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: "There was a Server Side Error!" });
  }
};

module.exports = {
  registerUser,
  authUser,
  updateUser,
  saveNewPassword,
  recoverPassword,
  changePassword,
  getUser,
  updateAddres,
  updateCart,
};
