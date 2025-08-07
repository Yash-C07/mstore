import express from 'express';
import Product from '../models/Product.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Welcome message for products route
router.get('/', async (req, res) => {
  try {
    res.json({
      message: 'Welcome to MStore Products API!',
      description: 'This endpoint provides access to all products in our store',
      endpoints: {
        'GET /': 'Get all products with filtering and pagination',
        'GET /:id': 'Get a specific product by ID',
        'POST /': 'Create a new product (Admin only)',
        'PUT /:id': 'Update a product (Admin only)',
        'DELETE /:id': 'Delete a product (Admin only)'
      },
      query: {
        'category': 'Filter by product category',
        'search': 'Search in product name and description',
        'sort': 'Sort by price-asc, price-desc, or rating',
        'page': 'Page number for pagination',
        'limit': 'Number of products per page'
      },
      example: 'GET /api/products?category=electronics&sort=price-asc&page=1&limit=10'
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create product (Admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, price, category, images, stock } = req.body;
    
    const product = new Product({
      name,
      description,
      price,
      category,
      images,
      stock
    });
    
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update product (Admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete product (Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
