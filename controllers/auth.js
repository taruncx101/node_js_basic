exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Log In",
    path: "/login",
    isAuthenticated: false,
  });
};
exports.postLogin = (req, res, next) => {
    req.isLoggedIn = true;
    res.redirect('/');
};