const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');

router.use(logger);

async function logger(req, res, next) {
    const isValid = await authMiddleware.verifyJwt(req.headers.authorization);
    if (isValid?.auth) {
        next();
    } else {
        res.status(401).json({ error: true, message: 'Unauthorized' });
    }
}

router.get('/', async (req, res) => {
    res.status(200).json({ message: 'Request endpoint' });
});

module.exports = router;
