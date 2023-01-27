import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "config";

import User from "../../models/User.js";
import jwtTokenToUserId from "../../middleware/jwtTokenToUserId.js";

// @route   GET api/auth
// @desc    get user data by using JWT token(middleware auth is for decode)
// @access  Public
router.get("/", jwtTokenToUserId, async (req, res) => {
  try {
    // get user info but filter out password
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.msg);
    return res.status(500).send("Server error");
  }
});
