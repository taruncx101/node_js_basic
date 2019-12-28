const path = require('path');

const express = require('express');
const router = express.Router();

const rootDir = require('../utils/path');

const adminData = require('./admin');

router.get('/',(req, res, next) => {
    // console.log(adminData.products)
    // res.sendFile(path.join(rootDir, 'views','shop.html'));
    res.render('shop', {
        prods: adminData.products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: adminData.products.length > 0
    })
});

module.exports = router;