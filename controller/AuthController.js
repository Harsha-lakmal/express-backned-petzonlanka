function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); // User එක authenticate වෙලානම්, next middleware එකට යන්න
    }
    res.redirect('/login'); // authenticate නොවුවොත්, login page එකට redirect කරන්න
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/dashboard'); // login වෙලා තියෙනවා නම්, dashboard එකට යන්න
    }
    next(); // නැත්නම් login/register page එකට යන්න
  }
  
  module.exports = {
    checkAuthenticated,
    checkNotAuthenticated
  };
  