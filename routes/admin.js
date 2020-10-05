const path = require('path');

const express = require('express');
const router = express.Router();

const rootDir = require('../utils/path');
const adminController = require('../controllers/admin')

const products = [];

// =>get requests
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

// =>post requests
router.post('/add-product', adminController.postAddProduct);

module.exports= router;