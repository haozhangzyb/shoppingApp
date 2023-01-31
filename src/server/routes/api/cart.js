import express from "express";
const router = express.Router();

import Product from "../../models/Product.js";
import Cart from "../../models/Cart.js";
import jwtTokenToUserId from "../../middleware/jwtTokenToUserId.js";

const findCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, products: [] });
    cart = await cart.save();
  }
  return cart;
};

// @route   GET api/cart
// @desc    Get cart
// @access  Private
router.get("/", jwtTokenToUserId, async (req, res) => {
  try {
    const cart = await findCart(req.user._id);
    return res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/cart
// @desc    Add product to cart
// @access  Private
router.post("/", jwtTokenToUserId, async (req, res) => {
  try {
    let cart = await findCart(req.user._id);
    let product = await Product.findById(req.body.productId);
    if (!product)
      return res.status(400).json({ msg: "Product not found" });

    // console.log(cart.products[0]._id.toString(), product._id);
    // console.log(cart.products.map((p) => p._id === product._id));
    if (
      cart.products.some(
        (p) => p._id.toString() === product._id.toString()
      )
    ) {
      cart.products = cart.products.map((p) => {
        if (p._id.toString() == product._id.toString()) {
          p.inCartQuantity += 1;
        }
        return p;
      });
    } else {
      const { _id, name, price, image_url } = product;
      product = { _id, name, price, image_url, inCartQuantity: 1 };

      cart.products.push(product);
    }

    cart.totalQuantity += 1;
    cart.subtotal += product.price;
    cart.tax = cart.subtotal * 0.1;
    cart.total = cart.subtotal + cart.tax - cart.discount;

    cart = await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/cart
// @desc    Delete all products of one productID from cart
// @access  Private
router.delete("/", jwtTokenToUserId, async (req, res) => {
  try {
    let cart = await findCart(req.user._id);

    if (cart.products.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    const product = cart.products.find(
      (p) => p._id.toString() === req.body.productId
    );

    if (!product) {
      return res
        .status(400)
        .json({ msg: "Product not found in your cart" });
    }

    cart.products = cart.products.filter(
      (p) => p._id.toString() !== req.body.productId
    );

    cart.totalQuantity -= product.inCartQuantity;
    cart.subtotal -= product.price * product.inCartQuantity;
    cart.tax = cart.subtotal * 0.1;
    cart.total = cart.subtotal + cart.tax - cart.discount;

    cart = await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/cart
// @desc    Remove one product quantity in cart
// @access  Private
router.put("/", jwtTokenToUserId, async (req, res) => {
  try {
    let cart = await findCart(req.user._id);

    if (cart.products.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    const product = cart.products.find(
      (p) => p._id.toString() === req.body.productId
    );

    if (!product) {
      return res
        .status(400)
        .json({ msg: "Product not found in your cart" });
    }

    if (product.inCartQuantity === 1) {
      cart.products = cart.products.filter(
        (p) => p._id.toString() !== req.body.productId
      );
    } else {
      cart.products = cart.products.map((p) => {
        if (p._id.toString() === req.body.productId) {
          p.inCartQuantity -= 1;
        }
        return p;
      });
    }

    cart.totalQuantity -= 1;
    cart.subtotal -= product.price;
    cart.tax = cart.subtotal * 0.1;
    cart.total = cart.subtotal + cart.tax - cart.discount;

    cart = await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export default router;
