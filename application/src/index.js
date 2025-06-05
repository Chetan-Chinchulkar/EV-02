const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/search', (req, res) => {
    const name = req.body.name;
    
    if (typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid input, should be content-type json with a name field' });
    }

    const query = `SELECT COUNT(*) as count FROM names WHERE name LIKE '${name}%'`;
    
    db.get(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ found: result.count > 0 });
   });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 
