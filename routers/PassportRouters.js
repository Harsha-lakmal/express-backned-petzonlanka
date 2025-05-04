const express = require('express');
const passport = require('passport'); 
const router = express.Router();

const authController = require('../controller/AuthController.js');

router.get('/', authController.checkNotAuthenticated, (req, res) => {
  res.send('Welcome to the Login Page!');
});

router.get('/dashboard', authController.checkAuthenticated, (req, res) => {
  res.send('Welcome to your Dashboard');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

module.exports = router;
