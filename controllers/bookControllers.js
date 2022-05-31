const BookModel = require("../models/Book.model");
// const passport = require('passport');
// const bcrypt = require('bcrypt');
// const session = require('express-session');
// const ensureAuthenticated = require('../ensure')


const addBook = (req, res, next) => {
    // console.log("req.body", req.body);
    bName = req.body.title;
    BookModel.findOne({ title: req.body.title }, function (err, book) {
        if (err) {
            next(err);
        } else if (book) {
            next(null,{ messages: "This Book already exists" })
        } else {
            let book = new BookModel({
                title: req.body.title,
                author: req.body.author
            })

            book.save((err, doc) => {
                if (err) {
                    console.log(err);
                } else {
                    next(null, doc);
                }
            })
        }
    })
}

const findBooks = (req, res, next) => {
    BookModel.find((err, books) => {
        if (books.length > 0) {
            if (err) {
                console.log(err)
            } else {
                // console.log("books", books);

                res.render(process.cwd() + '/views/index', { username: req.body.username, "books": books });
            }

        } else {
            console.log("books", books);
            res.render(process.cwd() + '/views/index', { username: req.body.username });
        }
    })
}


const addComments = (req, res, next) => {
    BookModel.findById({ "_id": req.body.id }, (err, books) => {
              
                books.comments.unshift(req.body);
                // console.log("unshift",books.comments);
                books.save((err, info) => {
                    console.log("info",info);
                    if(err) {
                        console.log(err);
                    } else {
                        next(null, info);
                    }
                })
    })
};


const deleteBook = (req, res, next) => {
    // find out what to replace bookId with****
    console.log('req.body.id', req.body.id);
    let bookToDelete = req.body.id
   
    BookModel.findOneAndRemove({ _id: bookToDelete }, (err, data) => {
        if(err) {
            res.json({ err: err })
        } else {
            
         next(null, data);
        }
    })
}

const deleteAll = (req, res, next) => {
   BookModel.deleteMany({}, (err, data) => {       
       
       if(err) {
           res.json({ err: err })
       } else {
           
        next(null, data);
       }
   }) 
}

module.exports = {
    addBook,
    findBooks,
    addComments,
    deleteBook,
    deleteAll
}