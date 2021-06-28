const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Blogs', blogSchema);