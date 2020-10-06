const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');

const p = path.join(rootDir,'data', 'products.json')

const getProductsFromFile = (cb) => {
        let products = [];
        fs.readFile(p, (err, fileContent) => {
            if(!err){
             cb(JSON.parse(fileContent))
            } else{
                cb([]);
            } 
            
        });
}
module.exports = class Product {
    constructor(title, imageUrl, description, price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save() {
        this.id = Math.random().toString();
        getProductsFromFile((products) => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log({err})
            })
        })
    }
    static fetchAllproducts(cb){
        getProductsFromFile(cb)
    }
}