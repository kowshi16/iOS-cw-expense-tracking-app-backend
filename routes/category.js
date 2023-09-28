const express = require('express');
const Category = require('../models/category');
const router = express.Router();

// POST - Create new category
router.post('/', (req, res) => {
    category = new Category({
        categoryTitle: req.body.categoryTitle
    });

    category.save().then(category => {
        res.send("Category created successfully");
    }).catch(error => {
        res.status(500).send("Error occurred while creating Category", error);
    });
});

module.exports = router;