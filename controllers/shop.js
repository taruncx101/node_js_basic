const Product = require('../models/product');
exports.getProducts = (req, res, next) => {
    // console.log(adminData.products)
    // res.sendFile(path.join(rootDir, 'views','shop.html'));
    // const products = adminData.products;
    Product.fetchAllproducts((products)=>{
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/product-list',
            hasProducts: products.length > 0,
            activeShop: true,
            productCss: true,
        })
    });
    
}

exports.getIndex = (req, res, next) => {
    Product.fetchAllproducts((products)=>{
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCss: true,
        })
    });

}
exports.getCart = (req, res, next) => {
    Product.fetchAllproducts((products)=>{
        res.render('shop/cart', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCss: true,
        })
    });

}