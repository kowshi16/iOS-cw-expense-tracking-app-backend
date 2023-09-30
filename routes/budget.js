const express = require('express');
const { Budget, validateBudget } = require('../models/budget');
const router = express.Router();

// POST - Create new budget
router.post('/create', async (req, res) => {
    const error = await validateBudget(req.body);
    if (error.message) {
        res.status(400).send(error.message);
    } else {
        budget = new Budget({
            budgetTitle: req.body.budgetTitle,
            amount: req.body.amount,
            category: req.body.category,
            budgetType: req.body.budgetType,
        });

        budget.save().then(budget => {
            res.status(200).json({ message: 'Budget created successfully' });
        }).catch(error => {
            console.error('Error creating budget:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
    }
});

// GET ALL - Budget
router.get("/get-all", (req, res) => {
    Budget.find().populate('category')
        .then((budget) => res.send(budget))
        .catch((error) => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// DELETE - Budget
router.delete('/delete/:budgetId', (req, res) => {
    Budget.findByIdAndRemove(req.params.budgetId)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'Budget with that ID was not found!'
                });
            } else {
                res.send({
                    message: "Budget was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Budget"
            });
        });
});

module.exports = router;