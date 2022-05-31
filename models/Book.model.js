const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    
        title: String,
        author: String,
        comments: [
            {
                comment: String,
                username: String
            }
        ]
        
    
})

const BookModel = mongoose.model('book', BookSchema);
module.exports = BookModel;