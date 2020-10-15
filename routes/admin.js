const path = require('path');

const express = require('express');
const router = express.Router();

const rootDir = require('../utils/path');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth')

const products = [];

// =>get requests
router.get('/add-product', isAuth, adminController.getAddProduct);

router.get("/products", isAuth,  adminController.getProducts);

router.get("/edit-product/:productId", isAuth,  adminController.getEditProduct);

router.post("/edit-product", isAuth,  adminController.postEditProduct);
// // =>post requests
router.post("/add-product", isAuth, adminController.postAddProduct);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports= router;