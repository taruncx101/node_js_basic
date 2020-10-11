const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./utils/path');


const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user')

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'public')))

app.use((req, res, next) => {
    User.findById("5f82841c963987930cd16431")
        .then((user) => {
        console.log(user);
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
      })
      .catch((err) => console.log(err));;
})

app.use('/admin', adminRoutes);

app.use(shopRoutes);

//for 404 page

app.use('/', errorController.get404);

mongoConnect(() => {
    app.listen(3001);
});


