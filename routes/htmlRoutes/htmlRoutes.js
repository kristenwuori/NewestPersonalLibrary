const passport = require('passport');
// const bcrypt = require('bcrypt');
const {
    home,
    register,
    login,
    profile,
    logout,
    fourOfour
} = require("../../controllers/userControllers");

const {
    findBooks,
} = require("../../controllers/bookControllers");

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};
module.exports = (app, db) => {
   


    app.route('/').get(home);

    app.route('/login').post(passport.authenticate('local', { failureRedirect: '/' }), findBooks, login);

    app.route('/profile')
        .get(ensureAuthenticated, profile);

    app.route('/register').post(
        register,
        passport.authenticate('local', { failureRedirect: '/' }),
        (req, res, next) => {
            res.redirect('/profile');
        }
    );

    app.route('/logout')
        .get(logout)

    app.use(fourOfour);

}