const crypto = require('crypto')
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check')

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
    oldInput: {}
  });
};

exports.getResetPassword = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset-password",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};
exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: {$gt: Date.now()}
  })
    .then(user => {
      console.log(user)
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => console.log(err));

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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    message = errors.array();
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: message[0].msg,
      oldInput: {email, password, confirmPassword}
    })
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
                from: "node@js.com",
                subject: "Signup succeeded!",
                html: "<h1> You successfully signed up!</h1>",
              });
          });
         
        })
    .catch((err) => console.log(err));
};

exports.postResetPassword = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
      return res.redirect('/reset-password');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash('error', 'No account with that email found.')
           return res.redirect("/reset-password");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
          res.redirect('/');
          traansporter.sendMail({
            to: req.body.email,
            from: "node@js.com",
            subject: "Password Reset",
            html: `
            <p >You requested a pssword reset.</p>
            <p >Click this <a href = "http://localhost:3001/reset-password/${token}">link</a> to set a new password.</p>
            `,
          });
      })
      .catch((err) => console.log(err));
  });
};
exports.postNewPassword = (req, res, next) => {
  const password = req.body.password
  const userId = req.body.userId
  const passwordToken = req.body.passwordToken
  let resetUser;
  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(password, 12)

    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
    })
    .then(user => {
      res.redirect('/login');
    })
    .catch((err) => console.log(err));
    ;

};
exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
