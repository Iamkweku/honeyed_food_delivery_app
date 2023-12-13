const express = require('express');
const pg = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

dotenv.config();
const dbUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;

const { Pool } = pg;
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet()); // Adds security headers

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const generateJwtToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

app.post('/signin', 
    // Validation rules
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            if (userResult.rows.length > 0) {
                const validPassword = await bcrypt.compare(password, userResult.rows[0].password);
                if (validPassword) {
                    const token = generateJwtToken(userResult.rows[0].id);
                    return res.json({ token });
                }
            }
            res.status(401).send('Invalid email or password');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
