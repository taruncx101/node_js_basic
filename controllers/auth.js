const User = require("../models/user");
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Log In",
    path: "/login",
    isAuthenticated: false,
  });
};
exports.postLogin = (req, res, next) => {
      User.findById("5f82e96b9986183cd0d4496c")
        .then((user) => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            res.redirect("/");

        })
        .catch((err) => console.log(err));

};
exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
              res.redirect("/");
    })

};
