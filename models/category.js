const mongoose = require('mongoose');

// Category Schema
const CategorySchema = new mongoose.Schema({
    categoryTitle: {
        type: String,
        required: true,
        maxlength: 30
    }
});

module.exports = new mongoose.model('Category', CategorySchema);