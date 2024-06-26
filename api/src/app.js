const express = require('express');
const router = require('./router');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'https://localhost',
    optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(router);

module.exports = app;
