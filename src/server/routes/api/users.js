import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/User.js";
import { secret } from "../../config/secret.js";

// @route   POST api/users
// @desc    Register route
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // See if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({ email, password, userType });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
    console.error(error);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

export default router;
