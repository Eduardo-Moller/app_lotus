const express = require('express');
const router = express.Router();
const requestsController = require('../../controllers/requestsController');
const authMiddleware = require('../../middlewares/authMiddleware');
const { isEmpty } = require('../../helpers/helpers');

router.use((req, res, next) => authMiddleware.verifyJwt(req, res, next));

router.get('/requests', async (req, res) => {
    const requests = await requestsController.getRequests();
    if (!isEmpty(requests)) {
        res.status(200).json(requests);
    } else {
        res.status(204).json('No content found');
    }
});

router.get('/request/:id', async (req, res) => {
    const requests = await requestsController.getRequest(req.params.id);
    if (!isEmpty(requests)) {
        res.status(200).json(requests);
    } else {
        res.status(204).json('No content found');
    }
});

router.post('/request', async (req, res) => {
    const request = await requestsController.createRequest(req.body);
    if (!isEmpty(request)) {
        res.status(201).json(request);
    } else {
        res.status(400).json('Bad request');
    }
});

router.delete('/request/:id', async (req, res) => {
    const request = await requestsController.deleteRequest(req.params.id);
    if (!isEmpty(request)) {
        res.status(200).json(request);
    } else {
        res.status(400).json('Bad request');
    }
});

module.exports = router;
