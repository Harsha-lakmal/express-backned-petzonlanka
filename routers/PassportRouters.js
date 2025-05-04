const express = require('express');
const passport = require('passport');  // <-- Import passport
const router = express.Router();

const authController = require('../controller/AuthController.js');

// Route for login page (ensure the user is not authenticated)
router.get('/', authController.checkNotAuthenticated, (req, res) => {
  res.send('Welcome to the Login Page!');
});

// Route for dashboard (ensure the user is authenticated)
router.get('/dashboard', authController.checkAuthenticated, (req, res) => {
  res.send('Welcome to your Dashboard');
});

// POST route for login using passport authentication
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

module.exports = router;
