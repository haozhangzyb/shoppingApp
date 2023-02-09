import express from "express";
const router = express.Router();

import Product from "../../models/Product.js";
import Cart from "../../models/Cart.js";
import jwtTokenToUserId from "../../middleware/jwtTokenToUserId.js";

const numberfy = (num) => Number(Number(num).toFixed(2));

// @route   GET api/cart
// @desc    Get cart
// @access  Private
router.get("/", jwtTokenToUserId, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, products: [] });
      cart = await cart.save();
    }

    return res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

// @route   POST api/cart
// @desc    Add product to cart
// @access  Private
router.post("/", jwtTokenToUserId, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, products: [] });
    }

    let product = await Product.findById(req.body.productId);
    if (!product)
      return res.status(400).json({ msg: "Product not found" });

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
    cart.subtotal = numberfy(cart.subtotal + product.price);
    cart.tax = numberfy(cart.subtotal * 0.1);
    cart.total = Math.max(
      0,
      numberfy(cart.subtotal + cart.tax - cart.discount)
    );

    cart = await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

// @route   DELETE api/cart
// @desc    Delete all products of one productID from cart
// @access  Private
router.delete("/", jwtTokenToUserId, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, products: [] });
    }

    if (cart.products.length === 0) {
      return res.status(400).json({ errors: [{ msg: "Cart is empty" }] });
    }

    const product = cart.products.find(
      (p) => p._id.toString() === req.body.productId
    );

    if (!product) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Product not found in your cart" }] });
    }

    cart.products = cart.products.filter(
      (p) => p._id.toString() !== req.body.productId
    );

    cart.totalQuantity -= product.inCartQuantity;
    cart.subtotal = numberfy(
      cart.subtotal - product.price * product.inCartQuantity
    );
    cart.tax = numberfy(cart.subtotal * 0.1);
    cart.total = numberfy(cart.subtotal + cart.tax - cart.discount);

    cart = await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

// @route   PUT api/cart
// @desc    Remove one product quantity in cart
// @access  Private
router.put("/", jwtTokenToUserId, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, products: [] });
    }

    if (cart.products.length === 0) {
      return res.status(400).json({ errors: [{ msg: "Cart is empty" }] });
    }

    const product = cart.products.find(
      (p) => p._id.toString() === req.body.productId
    );

    if (!product) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Product not found in your cart" }] });
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
    cart.subtotal = numberfy(cart.subtotal - product.price);
    cart.tax = numberfy(cart.subtotal * 0.1);
    cart.total = Math.max(
      0,
      numberfy(cart.subtotal + cart.tax - cart.discount)
    );

    cart = await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

// @route   POST api/cart/coupon
// @desc    Apply coupon to cart
// @access  Private
router.post("/coupon", jwtTokenToUserId, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, products: [] });
    }

    // if (cart.products.length === 0) {
    //   return res.status(400).json({ errors: [{ msg: "Cart is empty" }] });
    // }

    if (!req.body.coupon) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Coupon is required" }] });
    }

    const validCoupons = { "10OFF": 10, "20OFF": 20, "30OFF": 30 };

    const upperReqBodyCoupon = req.body.coupon.toUpperCase();

    if (!validCoupons[upperReqBodyCoupon]) {
      return res.status(400).json({ errors: [{ msg: "Invalid coupon" }] });
    }

    if (cart.coupons.includes(upperReqBodyCoupon)) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Coupon already applied" }] });
    }

    cart.coupons.push(upperReqBodyCoupon);
    cart.discount += validCoupons[upperReqBodyCoupon];
    cart.total = Math.max(
      0,
      numberfy(cart.subtotal + cart.tax - cart.discount)
    );

    cart = await cart.save();
    return res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

export default router;
