const path = require('path');

const express = require('express');
const router = express.Router();

const rootDir = require('../utils/path');

const products = [];


router.get('/add-product',(req, res, next) => {
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activeAddProduct: true,
        productCss: true,
        formCss: true,
    })
});
router.post('/add-product',(req, res, next) => {
    // console.log(req.body);
    products.push({title: req.body.title})
    res.redirect('/');
});

module.exports.routes = router;
module.exports.products = products;