const mongodb = require('mongodb')
const Product = require('../models/product');
const fileHelper = require('../utils/file')
exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      errorMessage: '',
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title; 
    const image = req.file; 
    const price = req.body.price; 
  const description = req.body.description; 
  if (!image) {
    return res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      errorMessage: 'Attached file is not an image.'
    });
  }
  const imageUrl = "/" + image.path;
    const product = new Product({
      title,
      imageUrl,
      price,
      description,
      userId: req.user,
    });
  product.save()
    .then(result => {
      console.log(result)
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log(err);
      const error = new Error(err);
      err.httpStatusCode = 500;
      return next(error);
  })
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit ? true : false;
  if (!editMode) {
    res.redirect('/')
  }
  const prodId = req.params.productId;

      Product.findById(prodId)
        .then((product) => {
          if (!product) {
            return res.redirect("/");
          }
          res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/products",
            editing: editMode,
            product: product,
            errorMessage: "",
          });
        })
        .catch((err) => {
          console.log(err);
          const error = new Error(err);
          err.httpStatusCode = 500;
          return next(error);
        });
};
exports.postEditProduct = (req, res, next) => {
      const prodId = req.body.productId;
      const title = req.body.title;
      const imageUrl = req.body.imageUrl;
      const price = req.body.price;
      const description = req.body.description;

  Product.findById(prodId)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
      product.title = title;
      product.description = description;
      product.price = price;
      const image = req.file;
      if (image) {
        fileHelper.deleteFile(product.imageUrl);
         product.imageUrl = '/'+image.path;
      }
           
      return product.save().then((result) => {
        console.log("product updated");
        res.redirect("/admin/products");
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      err.httpStatusCode = 500;
      return next(error);
    });
      
}
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return next(new Error("Product not found."));
      }
      fileHelper.deleteFile(product.imageUrl);
      return Product.deleteOne({ _id: prodId, userId: req.user._id });
    })
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return next(new Error("Product not found."));
      }
      fileHelper.deleteFile(product.imageUrl);
      return Product.deleteOne({ _id: prodId, userId: req.user._id });
    })
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.status(200).json({message: 'Success!'})
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({message: 'Deleting product failed'})
    });
};
exports.getProducts = (req, res, next) => {
  Product.find({
    userId: req.user._id,
  })
    //.select('title price -_id')
    //.populate('userId', 'name')
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      err.httpStatusCode = 500;
      return next(error);
    });
};
