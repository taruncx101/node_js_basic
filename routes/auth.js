const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get("/reset-password", authController.getResetPassword);

router.get("/reset/:token", authController.getNewPassword);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/logout', authController.postLogout);

router.post("/reset-password", authController.postResetPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;