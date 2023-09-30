const express = require('express');
const { Transaction, validateTransaction } = require('../models/transaction');
const { Category, validateCategory } = require('../models/category');
const { Budget } = require('../models/budget');
const router = express.Router();

// GET - Category Report
router.get('/get-category', async (req, res) => {
    try {
        const transactions = await Transaction.find();

        // Calculate total amount for each category
        const categoryTotals = transactions.reduce((totals, transaction) => {
            totals[transaction.category] = (totals[transaction.category] || 0) + transaction.amount;
            return totals;
        }, {});

        // Calculate percentage for each transaction based on category total
        const transactionsWithPercentage = transactions.map(transaction => ({
            ...transaction._doc,
            percentage: (transaction.amount / categoryTotals[transaction.category]) * 100
        }));

        res.json(transactionsWithPercentage);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET - Expense / Income Report
router.get('/get-transaction', async (req, res) => {
    const { fromDate, toDate, category, type } = req.query;

    const query = {};
    if (fromDate && toDate) {
        query.transDate = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    }
    if (category) {
        query.category = category;
    }
    if (type) {
        query.transType = type;
    }

    try {
        const transactions = await Transaction.find(query);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET - Category Count
router.get('/categories/count', async (req, res) => {
    try {
        const categoryCount = await Category.countDocuments();
        res.json({ count: categoryCount });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET - Transactions Count
router.get('/transactions/count', async (req, res) => {
    try {
        const transactionCount = await Transaction.countDocuments();
        res.json({ count: transactionCount });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET - This month total budget
router.get('/budget/this-month', async (req, res) => {
    try {
      const aggregationPipeline = [
        {
          $match: {
            budgetType: 'This Month'
          },
        },
        {
          $group: {
            _id: null,
            totalBudget: { $sum: '$amount' },
          },
        },
        {
          $project: {
            _id: 0,
            totalBudget: 1,
          },
        },
      ];
  
      const result = await Budget.aggregate(aggregationPipeline);
  
      res.json(result[0] || { totalBudget: 0 });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;