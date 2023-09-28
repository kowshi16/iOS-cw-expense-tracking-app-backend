const express = require('express');
const { Category, validateCategory } = require('../models/category');
const router = express.Router();

// POST - Create new category
router.post('/create', async (req, res) => {
    const error = await validateCategory(req.body);
    if (error.message) {
        res.status(400).send(error.message);
    } else {
        category = new Category({
            categoryTitle: req.body.categoryTitle
        });
    
        category.save().then(category => {
            res.send("Category created successfully");
        }).catch(error => {
            res.status(500).send("Error occurred while creating Category", error);
        });
    }
});

// GET ALL - Category
router.get("/get-all", (req, res) => {
    Category.find()
        .then((category) => res.send(category))
        .catch((error) => {
            res.status(500).send("Something went wrong");
        });
})

module.exports = router;