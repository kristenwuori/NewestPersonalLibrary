module.exports = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()===false) {
      
      res.redirect('/');
    }else{
      return next();

    }
  };
