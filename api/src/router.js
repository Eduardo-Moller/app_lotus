const express = require('express');
const auth = require('./routes/auth/authRouter');
const request = require('./routes/request/requestRouter');
const utils = require('./routes/utils/utilsRouter');
const path = require('path');

const router = express.Router();

router.use('/auth', auth);
router.use('/request', request);
router.use('/utils', utils);
router.use('/', express.static(path.join(__dirname, 'docs')));

router.get('/', (req, res) => res.sendFile(path.join(__dirname, 'docs', 'index.html')));

module.exports = router;
