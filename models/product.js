const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');

const products = [];
module.exports = class Product {
    constructor(t){
        this.title = t;
    }
    save(){
        const p = path.join(rootDir,'data', 'products.json')
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if(!err){
                products = JSON.parse(fileContent)
            }
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log({err})
            })
        });
        // products.push(this)
    }
    static fetchAllproducts(){
        const p = path.join(rootDir,'data', 'products.json')
        let products = [];
        fs.readFile(p, (err, fileContent) => {
            if(!err){
                return JSON.parse(fileContent)
            } 
            return [];
        });
        return products;
    }
}