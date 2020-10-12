const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const rootDir = require('./utils/path');


const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const errorController = require("./controllers/error");

const User = require('./models/user')

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'public')))

app.use((req, res, next) => {
    User.findById("5f82e96b9986183cd0d4496c")
      .then((user) => {
        req.user =user
        next();
      })
      .catch((err) => console.log(err));;
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

//for 404 page

app.use('/', errorController.get404);

mongoose
  .connect(
    "mongodb+srv://codelogicx101:codelogicx101@cluster0.raryu.mongodb.net/shop?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then((result) => {
    User.findOne()
      .then(user => {
        if (!user) {
              const user = new User({
                name: "Tarun",
                email: "tarunkumar@codelogicx.com",
                cart: {
                  items: [],
                },
              });
          return user.save();
        }
      })
  })
  .then(result => {
        console.log("connected");
        app.listen(3001);
  })
  .catch((err) => console.log(err));


