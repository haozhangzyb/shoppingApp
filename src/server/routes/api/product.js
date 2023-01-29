import express from "express";
const router = express.Router();

import Product from "../../models/product";
import jwtTokenToUserId from "../../middleware/jwtTokenToUserId";

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    return res.status(500).json("Server error");
  }
});

// @route   GET api/products/:id
// @desc    Get product by id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (error) {
    return res.status(500).json("Server error");
  }
});

// @route   DELETE api/products/:id
// @desc    DELETE product by id
// @access  Private
router.delete("/:id", jwtTokenToUserId, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Product not found" }] });
    }
    await product.remove();
    return res.json({ msg: "Product removed" });
  } catch (error) {
    return res.status(500).json("Server error");
  }
});

// @route   POST api/products
// @desc    Add new product
// @access  Private
router.post("/", jwtTokenToUserId, async (req, res) => {
  try {
    const { name, description, category, price, quantity, image_url } =
      req.body;
    const newProduct = new Product({
      name,
      description,
      category,
      price,
      quantity,
      image_url,
      createdAt: Date.now(),
    });

    let product = await Product.findOneAndUpdate(
      { _id: req.body.id },
      { $set: newProduct },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json(product);
  } catch (error) {
    return res.status(500).json("Server error");
  }
});
