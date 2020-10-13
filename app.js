const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const rootDir = require('./utils/path');


const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const errorController = require("./controllers/error");

const User = require('./models/user')

const MONGODB_URI = "mongodb+srv://codelogicx101:codelogicx101@cluster0.raryu.mongodb.net/shop";

const app = express();

const store = new MongoDBSession({
  uri: MONGODB_URI,
  collection: 'sessions',
});
const csrfProtection = csrf()

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'public')))

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

// app.use((req, res, next) => {
//   req.isLoggedIn = req.session.isLoggedIn;
//   User.findById("5f82e96b9986183cd0d4496c")
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// })
app.use((req, res, next) => {
  if (!req.session.user) { 
    return next();
  }
    User.findById(req.session.user._id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => console.log(err));

})

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

//for 404 page

app.use('/', errorController.get404);

mongoose
  .connect(MONGODB_URI + "?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected");
    app.listen(3001);
  })
  .catch((err) => console.log(err));


