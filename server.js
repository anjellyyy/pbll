const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/moodFood', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    dailyGoal: Number,
    moodHistory: [{
        mood: String,
        timestamp: Date,
        foodRecommended: String
    }]
});

const User = mongoose.model('User', userSchema);

// JWT Secret
const JWT_SECRET = 'your-secret-key';

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Routes
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password, dailyGoal } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            dailyGoal
        });

        await user.save();

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/mood', authenticateToken, async (req, res) => {
    try {
        const { mood } = req.body;
        const userId = req.userId;

        // Food recommendations based on mood
        let recommendations = [];
        switch(mood.toLowerCase()) {
            case 'happy':
                recommendations = ['Ice Cream', 'Pizza', 'Chocolate'];
                break;
            case 'sad':
                recommendations = ['Comfort Soup', 'Mac and Cheese', 'Dark Chocolate'];
                break;
            case 'stressed':
                recommendations = ['Green Tea', 'Banana', 'Dark Chocolate'];
                break;
            case 'energetic':
                recommendations = ['Smoothie', 'Salad', 'Fruit Bowl'];
                break;
            default:
                recommendations = ['Balanced Meal', 'Fresh Fruits', 'Vegetables'];
        }

        // Update user's mood history
        const user = await User.findById(userId);
        user.moodHistory.push({
            mood,
            timestamp: new Date(),
            foodRecommended: recommendations[0]
        });
        await user.save();

        res.json({ recommendations });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/history', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json({ history: user.moodHistory });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Food recommendations data
const moodFoods = {
    happy: [
        {
            name: "Dark Chocolate",
            image: "https://images.unsplash.com/photo-1575377427642-087cf684f29d",
            calories: 150,
            desc: "Rich in antioxidants and stimulates endorphin production",
            benefits: [
                "Boosts serotonin levels",
                "Contains mood-enhancing compounds",
                "Rich in magnesium"
            ]
        }
    ],
    sad: [
        {
            name: "Salmon",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
            calories: 200,
            desc: "Rich in omega-3 fatty acids that support brain health",
            benefits: [
                "May help reduce depression symptoms",
                "High in vitamin D",
                "Good source of protein"
            ]
        }
    ],
    stressed: [
        {
            name: "Avocado",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
            calories: 160,
            desc: "Packed with B vitamins and healthy fats",
            benefits: [
                "Helps regulate stress hormones",
                "Rich in potassium",
                "Contains stress-reducing nutrients"
            ]
        }
    ]
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));