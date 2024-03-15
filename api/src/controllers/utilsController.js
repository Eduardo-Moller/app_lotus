const utilsModel = require('../models/utilsModel');

async function getAllRowsFromTable(table) {
    return await utilsModel.getAllRowsFromTable(table);
}

async function getRowByIdFromTable(table, id) {
    return await utilsModel.getRowByIdFromTable(table, id);
}

async function createRowInTable(table, request) {
    return await utilsModel.createRowInTable(table, request);
}

async function deleteRowByIdFromTable(table, id) {
    return await utilsModel.deleteRowByIdFromTable(table, id);
}

module.exports = { getAllRowsFromTable, getRowByIdFromTable, createRowInTable, deleteRowByIdFromTable };
