const express = require('express');
const router = express.Router();
const requestsController = require('../../controllers/requestsController');
const authMiddleware = require('../../middlewares/authMiddleware');
const { isEmpty } = require('../../helpers/helpers');

router.use((req, res, next) => authMiddleware.verifyJwt(req, res, next));

/**
 * Rota para obter todas as requisições.
 *
 * @route GET /requests
 * @group Requests - Operações de Requisições
 * @returns {object[]} 200 - Array contendo todas as requisições
 * @returns {string} 204 - Sem conteúdo encontrado
 */
router.get('/requests', async (req, res) => {
    const requests = await requestsController.getRequests();
    if (!isEmpty(requests)) {
        res.status(200).json(requests);
    } else {
        res.status(204).json('No content found');
    }
});

/**
 * Rota para obter uma requisição por ID.
 *
 * @route GET /request/:id
 * @group Requests - Operações de Requisições
 * @param {string} id.path.required - O ID da requisição
 * @returns {object} 200 - Objeto representando a requisição
 * @returns {string} 204 - Sem conteúdo encontrado
 */
router.get('/request/:id', async (req, res) => {
    const requests = await requestsController.getRequest(req.params.id);
    if (!isEmpty(requests)) {
        res.status(200).json(requests);
    } else {
        res.status(204).json('No content found');
    }
});

/**
 * Rota para criar uma nova requisição.
 *
 * @route POST /request
 * @group Requests - Operações de Requisições
 * @param {object} body.body.required - Objeto contendo os dados da nova requisição
 * @returns {object} 201 - Objeto representando a nova requisição criada
 * @returns {string} 400 - Requisição inválida
 */
router.post('/request', async (req, res) => {
    const request = await requestsController.createRequest(req.body);
    if (!isEmpty(request)) {
        res.status(201).json(request);
    } else {
        res.status(400).json('Bad request');
    }
});

/**
 * Rota para excluir uma requisição por ID.
 *
 * @route DELETE /request/:id
 * @group Requests - Operações de Requisições
 * @param {string} id.path.required - O ID da requisição
 * @returns {object} 200 - Objeto representando a requisição excluída
 * @returns {string} 400 - Requisição inválida
 */
router.delete('/request/:id', async (req, res) => {
    const request = await requestsController.deleteRequest(req.params.id);
    if (!isEmpty(request)) {
        res.status(200).json(request);
    } else {
        res.status(400).json('Bad request');
    }
});

module.exports = router;
