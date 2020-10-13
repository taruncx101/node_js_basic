const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const traansporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:"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",
    },
  })
);

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0]; 
  }
  else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

exports.getSignup = (req, res, next) => {
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  User.findOne({
    email,
  })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid email or password.')
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              req.session.save((err) => {
                if (err) {
                  console.log(err);
                }
                res.redirect("/");
              });
          }
          else {
            req.flash("error", "Invalid email or password.");
            res.redirect("/login");
          }
        })
        .catch((err) => {
          console.log(err)
          req.flash("error", "Invalid email or password.");
           res.redirect("/login");
        });

    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash("error", "The email already exists.");
          return res.redirect('/signup')
      }
     bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
       .then((user) => {
          req.session.isLoggedIn = true;
          req.session.user = user;
          req.session.save((err) => {
             //console.log(err);
            res.redirect("/");
              return traansporter.sendMail({
                to: email,
                from: "node@comple.com",
                subject: "Signup succeeded!",
                html: "<h1> You successfully signed up!</h1>",
              });
          });
         
        });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
