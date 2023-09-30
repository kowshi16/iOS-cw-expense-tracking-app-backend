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
            res.json({ message: 'Category created successfully' });
        }).catch(error => {
            res.status(500).json({ error: 'Error occurred while creating Category' });
        });
    }
});

// GET ALL - Category
router.get("/get-all", (req, res) => {
    Category.find()
        .then((category) => res.send(category))
        .catch((error) => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// DELETE - Category
router.delete('/delete/:categoryId', async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.categoryId);
    if (!category) res.status(404).json({ message: 'Category with that ID is not found' });
    res.json({ message: 'Category deleted successfully' });
});

module.exports = router;