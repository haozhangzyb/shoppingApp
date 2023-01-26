const express = require("express");
const router = express.Router();

// @route   POST api/users
// @desc    Register route
// @access  Public
router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    // res.send("User route");
    const { email, password } = req.body;
    // return res.json({ message: "Registration Success!", email, password });
    return res.json({ email });
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

module.exports = router;
