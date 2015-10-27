module.exports = {
    auth: function (req, res, next) {
      if ( req.isAuthenticated() ) {
       return next();
      }
       res.redirect('/about');
      },

    admin: function (req, res, next) {
      console.log(req.user.group);
      if ( (req.isAuthenticated() ) && ( req.user.group === 'admin') ) {
       return next();
      }
       res.redirect('/about');
     }
}