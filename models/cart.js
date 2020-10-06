const fs = require('fs')
const path = require('path')

const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
          let cart = { products: [], totoalPrice: 0 };
          if (!err) {
            cart = JSON.parse(fileContent);
          }
          // Analyze the cart => Find existing product
          // Add new product/ increase quantity
          const existingProductIndex = cart.products.findIndex(
            (prod) => prod.id === id
          );
          const existingProduct = cart.products[existingProductIndex];
          let updatedProduct;
          if (existingProduct) {
            updatedProduct = { ...existingProduct };
            updatedProduct.qty = updatedProduct.qty + 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
          } else {
            updatedProduct = { id: id, qty: 1 };
            cart.products = [...cart.products, updatedProduct];
          }
          cart.totalPrice = cart.totoalPrice + +productPrice;
          fs.writeFile(p, JSON.stringify(cart), (err) => {
            console.log(err);
          });
        })
      
    }
  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => { 
      if (err) {
        return;
      }
      let cart =  JSON.parse(fileContent);
      const updatedCart = { ...cart }
      const product = updatedCart.products.find(prod => prod.id == id)
      if (product) {
        const productQty = product.qty;
        updatedCart.products = updatedCart.products.filter(prod => prod.id !== id) 
        updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty; 
        fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
          console.log(err);
        });
      }
      
    })
  }
}