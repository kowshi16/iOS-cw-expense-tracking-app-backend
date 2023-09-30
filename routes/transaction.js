const express = require('express');
const { Transaction, validateTransaction } = require('../models/transaction');
const router = express.Router();

// POST - Create new transaction
router.post('/create', async (req, res) => {
    const error = await validateTransaction(req.body);
    if (error.message) {
        res.status(400).send(error.message);
    } else {
        transaction = new Transaction({
            transTitle: req.body.transTitle,
            description: req.body.description,
            amount: req.body.amount,
            transType: req.body.transType,
            category: req.body.category,
            location: req.body.location,
            transDate: req.body.transDate
        });

        transaction.save().then(transaction => {
            res.status(200).json({ message: 'Transaction created successfully' });
        }).catch(error => {
            console.error('Error creating transaction:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
    }
});

// GET ALL - Transaction
router.get("/get-all", (req, res) => {
    Transaction.find()
        .then((transaction) => res.send(transaction))
        .catch((error) => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// GET BY ID - Transaction
router.get("/get-by-id/:transactionId", (req, res) => {
    Transaction.findById(req.params.transactionId).then(transaction => {
        if (transaction) {
            res.send(transaction);
        } else {
            res.status(400).json({ message: 'Transaction not found' });
        }
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
});

// UPDATE - Transaction
router.put('/update-by-id/:transactionId', (req, res) => {
    Transaction.findByIdAndUpdate(req.params.transactionId, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'Transaction with that ID was not found!'
                });
            } else res.send({ message: "Transaction was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Transaction"
            });
        });
});

// DELETE - Transaction
router.delete('/delete/:transactionId', (req, res) => {
    Transaction.findByIdAndRemove(req.params.transactionId)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'Transaction with that ID was not found!'
                });
            } else {
                res.send({
                    message: "Transaction was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Transaction"
            });
        });
});

module.exports = router;