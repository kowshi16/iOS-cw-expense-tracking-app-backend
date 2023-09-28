const mongoose = require('mongoose');
const yup = require('yup');

// Category Schema
const CategorySchema = new mongoose.Schema({
    categoryTitle: {
        type: String,
        required: true,
        maxlength: 30
    }
});

const validateCategory = category => {
    const schema = yup.object().shape({
        categoryTitle: yup.string()
            .required('Title is required')
            .max(30, 'Title must be at less than or equal 30 characters')
    });

    return schema.validate(category).then(category => category).catch(error => {
        return {
            message: error.errors
        }
    });
}

exports.Category = new mongoose.model('Category', CategorySchema);
exports.validateCategory = validateCategory;