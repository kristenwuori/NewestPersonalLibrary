const Usermodel = require("../models/User.model")
const passport = require('passport');
const bcrypt = require('bcrypt');
// const session = require('express-session');
const ensureAuthenticated = require('../ensure')
const {
    findBooks
} = require("../controllers/bookControllers");
const home = (req, res) => {
    res.render(process.cwd() + '/views/login', { title: 'Hello', message: 'Please login', showLogin: true, showRegistration: true });
}


const register = (req, res, next) => {
   
    
    Usermodel.findOne({ username: req.body.username }, (err, data) => {
        var hash = bcrypt.hashSync(req.body.password, 12)
        console.log(data);
        
        if(err) {
            console.log(err);
        } else if (data) {
            res.render(process.cwd() + '/views/login', { message: 'User Already Exists' });
        } else {
            let user = new Usermodel({
                username: req.body.username,
                password: hash
            })
            user.save((err, doc) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("user",user);
                    next(null, user);
                }
            })
        }
    })
}


const login = (req, res) => {
    res.redirect('/profile');
}

const profile = (req, res) => {
    // console.log(req);
    console.log(findBooks);
    
    // findBooks,
    res.render(process.cwd() + '/views/index', { username: req.user.username });
};

const logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

const fourOfour= (req, res, next) => {
    res.status(404)
        .type('text')
        .send('Not Found');
}

module.exports = {
    home,
    register,
    login,
    profile,
    logout,
    fourOfour
} 