const mongoose = require('mongoose');
const yup = require('yup');
const Category = require('./category');

// Transaction Schema
const TransactionSchema = new mongoose.Schema({
    transTitle: {
        type: String,
        required: true,
        maxlength: 20
    },
    description: {
        type: String,
        required: true,
        maxlength: 40
    },
    amount: {
        type: Number,
        required: true,
    },
    transType: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    location: {
        type: String,
        required: true,
        maxlength: 30
    },
    transDate: {
        type: Date,
        required: true
    },
});

const validateTransaction = transaction => {
    const schema = yup.object().shape({
        transTitle: yup.string()
            .required('Title is required')
            .max(20, 'Title must be at less than or equal 20 characters'),
        description: yup.string()
            .required('Description is required')
            .max(40, 'Description must be at less than or equal 40 characters'),
        amount: yup.number()
            .required('Amount is required'),
        transType: yup.string()
            .required('Type is required'),
        location: yup.string()
            .required('Location is required')
            .max(30, 'Location must be at less than or equal 30 characters'),
        transDate: yup.date().required('Date is required')
    });

    return schema.validate(transaction).then(transaction => transaction).catch(error => {
        return {
            message: error.errors
        }
    });
};

exports.Transaction = new mongoose.model('Transaction', TransactionSchema);
exports.validateTransaction = validateTransaction;