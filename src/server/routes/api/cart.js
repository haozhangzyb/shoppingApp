import express from "express";
const router = express.Router();

import Product from "../../models/Product.js";
import Cart from "../../models/Cart.js";
import User from "../../models/User.js";
import jwtTokenToUserId from "../../middleware/jwtTokenToUserId.js";

const numberfy = (num) => Number(Number(num).toFixed(2));

// @route   GET api/cart
// @desc    Get cart
// @access  Private
router.get("/", jwtTokenToUserId, async (req, res) => {
  try {
    let userId = await User.findById(req.user.id);
    userId = userId._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
      cart = await cart.save();
    }

    return res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

const addProductToCart = (cart, product) => {
  const isProductInCart = cart.products.some(
    (p) => p._id.toString() === product._id.toString()
  );
  if (isProductInCart) {
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

  return cart;
};

// @route   POST api/cart
// @desc    Add product to cart
// @access  Private
router.post("/", jwtTokenToUserId, async (req, res) => {
  try {
    let userId = await User.findById(req.user.id);
    userId = userId._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    let product = await Product.findById(req.body.productId);
    if (!product)
      return res.status(400).json({ msg: "Product not found" });

    cart = addProductToCart(cart, product);

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
    let userId = await User.findById(req.user.id);
    userId = userId._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
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

// @route   PUT api/cart
// @desc    Remove one product quantity in cart
// @access  Private
router.put("/", jwtTokenToUserId, async (req, res) => {
  try {
    let userId = await User.findById(req.user.id);
    userId = userId._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
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
    let userId = await User.findById(req.user.id);
    userId = userId._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    // if (cart.products.length === 0) {
    //   return res.status(400).json({ errors: [{ msg: "Cart is empty" }] });
    // }

    if (!req.body.coupon) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Coupon is required" }] });
    }

    const validCoupons = [
      { id: "1", code: "10OFF", discount: 10 },
      { id: "2", code: "20OFF", discount: 20 },
      { id: "3", code: "30OFF", discount: 30 },
    ];

    const upperReqBodyCoupon = req.body.coupon.toUpperCase();

    const coupon = validCoupons.find((c) => c.code === upperReqBodyCoupon);

    if (!coupon) {
      return res.status(400).json({ errors: [{ msg: "Invalid coupon" }] });
    }

    const isCouponAlreadyApplied = cart.coupons.some(
      (c) => c.code === upperReqBodyCoupon
    );
    if (isCouponAlreadyApplied) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Coupon already applied" }] });
    }

    cart.coupons.push(coupon);
    cart.discount += coupon.discount;
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

// @route   DELETE api/cart/coupon
// @desc    Remove coupon from cart
// @access  Private
router.delete("/coupon", jwtTokenToUserId, async (req, res) => {
  try {
    let userId = await User.findById(req.user.id);
    userId = userId._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(400).json({ errors: [{ msg: "Cart is empty" }] });
    }

    if (!req.body.couponId) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Coupon is required" }] });
    }

    const appliedCoupon = cart.coupons.find(
      (c) => c.id === req.body.couponId
    );

    if (!appliedCoupon) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Coupon not applied" }] });
    }

    cart.discount -= appliedCoupon.discount;
    cart.coupons = cart.coupons.filter((c) => c.id !== req.body.couponId);
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

// @route   POST api/cart/sync
// @desc    sync local cart with server cart
// @access  Private
router.post("/sync", jwtTokenToUserId, async (req, res) => {
  try {
    let userId = await User.findById(req.user.id);
    userId = userId._id;

    let cart = await Cart.findOne({ user: userId });
    if (cart.products.length) {
      return res.status(200).json(cart);
    }

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    if (!req.body.products) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Products are required" }] });
    }

    req.body.products.forEach((p) => {
      cart = addProductToCart(cart, p);
    });

    cart = await cart.save();

    return res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

export default router;
