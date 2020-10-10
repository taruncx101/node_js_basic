const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./utils/path');

const sequelize = require("./utils/database");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const Product = require('./models/product')
const User = require('./models/user')

const errorController = require("./controllers/error");

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'public')))

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
      })
      .catch((err) => console.log(err));;
})

app.use('/admin', adminRoutes);

app.use(shopRoutes);

//for 404 page

app.use('/', errorController.get404);

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE',
});
User.hasMany(Product);
sequelize
    //.sync({force: true})
    .sync()
    .then(result => {
        User.findByPk(1)
            .then(user => {
                if (!user) {
                    return User.create({
                        name: 'Tarun',
                        email: 'tarunkumar@codelogicx.com'
                    })
                }
                return Promise.resolve(user);
            })
            .then(user => {
                console.log(user)
                app.listen(3001);
            })
            .catch (err => console.log(err));
        
    })
    .catch(err => {
    console.log(err);
});

