import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import connectDB from "./config/database.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import productRoutes from "./routes/products.js";
import { authenticateToken } from "./middleware/auth.js";


dotenv.config();

// Set environment variables if not already set
if (!process.env.PORT) process.env.PORT = '9999';
if (!process.env.MONGODB_URI) process.env.MONGODB_URI = 'mongodb+srv://KavinCharlie:jaya2005@cluster0.xaxng.mongodb.net/mstore';
if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'your_jwt_secret_key_here_change_this_in_production';

// Debug: Log environment variables
console.log('Environment variables:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Remove in-memory users array as we're now using MongoDB


const validateRegistration = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];


// Remove duplicate authenticateToken function as it's now in middleware




app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'MStore Backend Server is running!', 
    status: 'OK',
    timestamp: new Date().toISOString(),
    endpoints: {
      'GET /api/health': 'Server health check',
      'POST /api/auth/register': 'Register a new user',
      'POST /api/auth/login': 'Login user',
      'GET /api/auth/profile': 'Get user profile (requires auth)',
      'PUT /api/auth/profile': 'Update user profile (requires auth)',
      'PUT /api/auth/change-password': 'Change password (requires auth)',
      'POST /api/auth/logout': 'Logout (requires auth)',
      'GET /api/products': 'Get products information',
      'GET /api/products/:id': 'Get specific product',
      'POST /api/products': 'Create product (Admin only)',
      'PUT /api/products/:id': 'Update product (Admin only)',
      'DELETE /api/products/:id': 'Delete product (Admin only)'
    }
  });
});


app.post('/api/auth/register', validateRegistration, async (req, res) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { name, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Registration failed: User already exists with this email',
        suggestion: 'Try logging in instead or use a different email address'
      });
    }

    
    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || 'EvloPeriyaSecretKey',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Welcome to MStore! User registered successfully',
      user: newUser.toJSON(),
      token,
      nextSteps: {
        'Login': 'Use the token for authenticated requests',
        'Profile': 'GET /api/auth/profile with Authorization header',
        'Products': 'GET /api/products to browse products'
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Registration failed: User already exists with this email',
        suggestion: 'Try logging in instead or use a different email address'
      });
    }
    res.status(500).json({ 
      message: 'Internal server error',
      suggestion: 'Please try again later'
    });
  }
});


app.post('/api/auth/login', validateLogin, async (req, res) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'EvloPeriyaSecretKey',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Welcome back to MStore! Login successful',
      user: user.toJSON(),
      token,
      nextSteps: {
        'Profile': 'GET /api/auth/profile with Authorization header',
        'Products': 'GET /api/products to browse products',
        'Logout': 'POST /api/auth/logout when done'
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: user.toJSON() });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/api/auth/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Product routes
app.use('/api/products', productRoutes);


app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: req.user.userId } });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON()
    });

  } catch (error) {
    console.error('Profile update error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.put('/api/auth/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });

  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
