const express = require('express');
const auth = require('./routes/auth/authRouter');
const request = require('./routes/request/requestRouter');
const utils = require('./routes/utils/utilsRouter');

const router = express.Router();

router.use('/auth', auth);
router.use('/request', request);
router.use('/utils', utils);

router.use('/', (req, res) => {
    res.send('API DOC HERE');
});

module.exports = router;
