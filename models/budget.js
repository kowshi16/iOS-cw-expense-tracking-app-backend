const mongoose = require('mongoose');
const yup = require('yup');

// Budget Schema
const BudgetSchema = new mongoose.Schema({
    budgetTitle: {
        type: String,
        required: true,
        maxlength: 30
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    budgetType: {
        type: String,
        required: true
    },
});

const validateBudget = budget => {
    const schema = yup.object().shape({
        budgetTitle: yup.string()
            .required('Title is required')
            .max(30, 'Title must be at less than or equal 30 characters'),
        amount: yup.number()
            .required('Amount is required'),
        budgetType: yup.string()
            .required('Type is required'),
    });

    return schema.validate(budget).then(budget => budget).catch(error => {
        return {
            message: error.errors
        }
    });
};

exports.Budget = new mongoose.model('Budget', BudgetSchema);
exports.validateBudget = validateBudget;