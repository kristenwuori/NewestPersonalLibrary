const { addBook, findBooks, addComments, deleteBook, deleteAll } = require("../../controllers/bookControllers");
const { profile } = require("../../controllers/userControllers");
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};
module.exports = (app, db) => {


    app.route('/api/books').post(addBook, findBooks).get(findBooks);
    // console.log("here are my book routes", app);

    app.route('/api/comment').post(addComments, findBooks);

    app.route('/api/delete/').post(deleteBook, findBooks);

    app.route('/api/deleteAll').post(deleteAll, findBooks);
}

