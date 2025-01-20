
const express = require('express');
const Category = require('../models/category');
const router = express.Router();
const protect = require('../middleware/authMiddleware'); // authentication middleware

// Create a new category (POST)
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const category = new Category({ name });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
});

// Read all categories (GET)
router.get('/', protect , async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Read a single category (GET)
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
});

// Update a category (PUT)
router.put('/:id', async (req, res) => {
    const { name } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
});

// Delete a category (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

module.exports = router;
