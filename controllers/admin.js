const { deleteById } = require('../models/product');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    })
}

exports.postAddProduct = (req, res, next) => {
    // console.log(req.body);
    const title = req.body.title; 
    const imageUrl = req.body.imageUrl; 
    const price = req.body.price; 
    const desciption = req.body.desciption; 
    const product = new Product(null, title, imageUrl, desciption, price);
    product.save();
    res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit ? true : false;
  if (!editMode) {
    res.redirect('/')
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      //return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/products",
      editing: editMode,
      product: product,
    });
  })

};
exports.postEditProduct = (req, res, next) => {
      const prodId = req.body.productId;
      const title = req.body.title;
      const imageUrl = req.body.imageUrl;
      const price = req.body.price;
      const desciption = req.body.desciption;
      const product = new Product(prodId, title, imageUrl, desciption, price);
      product.save();
      res.redirect("/");
}
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
};
exports.getProducts = (req, res, next) => {
  Product.fetchAllproducts((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
