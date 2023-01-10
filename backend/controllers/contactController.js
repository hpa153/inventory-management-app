import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";

const contactUs = asyncHandler (async (req, res) => {
  const { subject, message } = req.body;
  const user = await User.findById(req.user._id);

  // Input validation
  // Missing field
  if (!subject || !message) {
    res.status(400);
    throw new Error("Please provide in subject and message!");
  }

  if (!user) {
    res.status(400);
    throw new Error("User does not exist!");
  }

  // Send email
  const sendFrom = process.env.USER_EMAIL;
  const sendTo = process.env.USER_EMAIL;
  const replyTo = user.email;

  try {
    await sendEmail(subject, message, sendFrom, sendTo, replyTo);
    res.status(200).json({success: true, message: "Email sent"});
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again!");
  }
});

export {
  contactUs,
}