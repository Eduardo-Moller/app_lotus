const express = require('express');
const router = express.Router();
const utilsController = require('../../controllers/utilsController');
const { verifyJwt } = require('../../middlewares/authMiddleware');
const { checkUtilsTable } = require('../../middlewares/utilsMiddleware');
const { isEmpty } = require('../../helpers/helpers');

router.use((req, res, next) => verifyJwt(req, res, next));

router.get('/:table', async (req, res) => {
    checkUtilsTable(req, res);
    const requests = await utilsController.getAllRowsFromTable(req.params.table);
    if (!isEmpty(requests)) {
        res.status(200).json(requests);
    } else {
        res.status(204).json('No content found');
    }
});

router.get('/:table/:id', async (req, res) => {
    checkUtilsTable(req, res);
    const requests = await utilsController.getRowByIdFromTable(req.params.table, req.params.id);
    if (!isEmpty(requests)) {
        res.status(200).json(requests);
    } else {
        res.status(204).json('No content found');
    }
});

router.post('/:table', async (req, res) => {
    checkUtilsTable(req, res);
    const request = await utilsController.createRowInTable(req.params.table, req.body);
    if (!isEmpty(request)) {
        res.status(201).json(request);
    } else {
        res.status(400).json('Bad request');
    }
});

router.delete('/:table/:id', async (req, res) => {
    checkUtilsTable(req, res);
    const request = await utilsController.deleteRowByIdFromTable(req.params.table, req.params.id);
    if (!isEmpty(request)) {
        res.status(200).json(request);
    } else {
        res.status(400).json('Bad request');
    }
});

module.exports = router;
