const express = require('express');
const router = express.Router();
const utilsController = require('../../controllers/utilsController');
const { verifyJwt } = require('../../middlewares/authMiddleware');
const { checkUtilsTable } = require('../../middlewares/utilsMiddleware');
const { isEmpty } = require('../../helpers/helpers');

router.use((req, res, next) => verifyJwt(req, res, next));

/**
 * Rota para obter todas as linhas de uma tabela.
 *
 * @route GET /utils/:table
 * @group Utils - Operações Utilitárias
 * @param {string} table.path.required - O nome da tabela
 * @returns {object} 200 - Array contendo todas as linhas da tabela
 * @returns {string} 204 - Sem conteúdo encontrado
 */
router.get('/:table', async (req, res) => {
    checkUtilsTable(req, res);
    const requests = await utilsController.getAllRowsFromTable(req.params.table);
    if (!isEmpty(requests)) {
        res.status(200).json(requests);
    } else {
        res.status(204).json('No content found');
    }
});

/**
 * Rota para obter uma linha de uma tabela por ID.
 *
 * @route GET /utils/:table/:id
 * @group Utils - Operações Utilitárias
 * @param {string} table.path.required - O nome da tabela
 * @param {string} id.path.required - O ID da linha a ser obtida
 * @returns {object} 200 - Objeto representando a linha da tabela
 * @returns {string} 204 - Sem conteúdo encontrado
 */
router.get('/:table/:id', async (req, res) => {
    checkUtilsTable(req, res);
    const requests = await utilsController.getRowByIdFromTable(req.params.table, req.params.id);
    if (!isEmpty(requests)) {
        res.status(200).json(requests);
    } else {
        res.status(204).json('No content found');
    }
});

/**
 * Rota para criar uma nova linha em uma tabela.
 *
 * @route POST /utils/:table
 * @group Utils - Operações Utilitárias
 * @param {string} table.path.required - O nome da tabela
 * @param {object} body.body.required - Objeto contendo os dados da nova linha
 * @returns {object} 201 - Objeto representando a nova linha criada
 * @returns {string} 400 - Requisição inválida
 */
router.post('/:table', async (req, res) => {
    checkUtilsTable(req, res);
    const request = await utilsController.createRowInTable(req.params.table, req.body);
    if (!isEmpty(request)) {
        res.status(201).json(request);
    } else {
        res.status(400).json('Bad request');
    }
});

/**
 * Rota para excluir uma linha de uma tabela por ID.
 *
 * @route DELETE /utils/:table/:id
 * @group Utils - Operações Utilitárias
 * @param {string} table.path.required - O nome da tabela
 * @param {string} id.path.required - O ID da linha a ser excluída
 * @returns {object} 200 - Objeto representando a linha excluída
 * @returns {string} 400 - Requisição inválida
 */
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
