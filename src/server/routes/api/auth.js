import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../../models/User.js";
import jwtTokenToUserId from "../../middleware/jwtTokenToUserId.js";
import { secret } from "../../config/secret.js";

// @route   GET api/auth
// @desc    get user data by using JWT token(middleware auth is for decode)
// @access  Public
router.get("/", jwtTokenToUserId, async (req, res) => {
  try {
    // get user info but filter out password
    const user = await User.findById(req.user.id).select(
      "-password -__v -_id"
    );
    res.json(user);
  } catch (err) {
    console.log(err.msg);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

// @route   POST api/auth
// @desc    Authenticate user(Login) and get token
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // See if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // get the payload from db with the user id(_id)
    const payload = {
      user: { id: user.id },
    };

    // return jsonwebtoken
    jwt.sign(
      payload,
      secret.jwtSecret,
      { expiresIn: 360000 },
      (err, encoded) => {
        if (err) throw err;
        return res.json({ token: encoded });
      }
    );
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send email to reset password
// @access  Public
router.post("/forgot-password/:email", async (req, res) => {
  try {
    const email = req.params.email;

    // See if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid email" }] });
    }

    return res.json({ msg: "Email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

// @route   POST /api/auth/update-password
// @desc    update password
// @access  Public
router.post("/update-password/", async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;

    // See if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return res.json({ msg: "Update successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

export default router;
