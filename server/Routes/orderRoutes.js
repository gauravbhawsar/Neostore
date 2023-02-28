const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const multer = require("multer");
const storage = multer.memoryStorage();
var upload = multer({ storage: storage });
dotenv.config();
const {
  createOrder,
  getOrderByUser,
} = require("../Controllers/orderController");

router.post("/createOrder", createOrder);
router.post("/getOrderByUser", getOrderByUser);
router.post("/sendEmail/:email", upload.single("file"), (req, res) => {
  let email = req.params.email;
  console.log(email);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gauravbhawsar98@gmail.com",
      pass: process.env.password,
    },
  });

  var mailOptions = {
    from: "gauravbhawsar98@gmail.com",
    to: email,
    subject: "Invoice PDF",
    text: `Dear Customer,

       Your Have Successfully downloaded the pdf and We have attached the pdf here. Please find Attached PDF.
       
       Thank You!`,
    attachments: [
      {
        filename: "invoice.pdf",
        content: req.file.buffer,
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json({ error: 1, msg: "something went wrong" });
    } else {
      res.json({ error: 0, msg: "mail sent" });
    }
  });
});
module.exports = router;
