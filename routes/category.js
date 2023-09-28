const express = require('express');
const {Category, validateCategory} = require('../models/category');
const router = express.Router();

// POST - Create new category
router.post('/', async (req, res) => {
    const error = await validateCategory(req.body);
    if (error.message) {
        res.status(400).send(error.message);
    }

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