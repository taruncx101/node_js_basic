const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get("/reset-password", authController.getResetPassword);

router.get("/reset/:token", authController.getNewPassword);

router.post('/login', authController.postLogin);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("please enter a valid email.")
      .custom((value, { req }) => {
        if (value === "test@test.com") {
          throw new Error("The email address is forbidden.");
        }
        return true;
      }),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.post("/reset-password", authController.postResetPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;