const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

router.post('/login', async (req, res) => {
    if (req.body.login && req.body.password) {
        const result = await authController.login(req.body);
        if (result?.auth) {
            res.status(200).json(result);
        } else {
            res.status(401).json({ error: true, message: 'Unauthorized' });
        }
    } else {
        res.status(400).json({ error: true, message: 'Bad Request' });
    }
});

router.post('/register', async (req, res) => {
    if (req.body) {
        const result = await authController.register(req.body);
        if (result?.auth) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: true, message: 'Registration failed' });
        }
    } else {
        res.status(400).json({ error: true, message: 'Bad Request' });
    }
});

module.exports = router;
