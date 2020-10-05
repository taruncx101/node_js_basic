const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activeAddProduct: true,
        productCss: true,
        formCss: true,
    })
}

exports.postAddProduct = (req, res, next) => {
    // console.log(req.body);
    const title = req.body.title; 
    const imageUrl = req.body.imageUrl; 
    const price = req.body.price; 
    const desciption = req.body.desciption; 
    const product = new Product(title, imageUrl, desciption, price);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAllproducts((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
