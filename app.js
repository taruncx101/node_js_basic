const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./utils/path');

const sequelize = require("./utils/database");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminRoutes);

app.use(shopRoutes);

//for 404 page

app.use('/', errorController.get404);

sequelize
    .sync()
    .then(result => {
        //console.log(result);
        app.listen(3001);
    })
    .catch(err => {
    console.log(err);
});

