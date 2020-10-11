const path = require('path');

const express = require('express');
const router = express.Router();

const rootDir = require('../utils/path');
const adminController = require('../controllers/admin');
const { Router } = require('express');

const products = [];

// // =>get requests
// router.get('/add-product', adminController.getAddProduct);

// router.get('/products', adminController.getProducts);

// router.get("/edit-product/:productId", adminController.getEditProduct);

// router.post("/edit-product", adminController.postEditProduct);
// // // =>post requests
// router.post('/add-product', adminController.postAddProduct);

// router.post("/delete-product", adminController.postDeleteProduct);

module.exports= router;