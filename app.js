const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./utils/path');


const db = require("./utils/database");


const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

const app = express();

db.execute('SELECT * FROM products')
    .then((result) => {
        //console.log(result)
    })
    .catch((err) => {
        console.log(err)
    });

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminRoutes);

app.use(shopRoutes);

//for 404 page

app.use('/',errorController.get404);

app.listen(3001);