const sqlHelpers = require('../helpers/sqlHelpers');

async function getAllRowsFromTable(table) {
    return await sqlHelpers.selectAllTable(table, { deleted: 0 });
}

async function getRowByIdFromTable(table, id) {
    return await sqlHelpers.selectTable(table, { id, deleted: 0 });
}

async function createRowInTable(table, request) {
    return await sqlHelpers.insertUpdateTable(table, request);
}

async function deleteRowByIdFromTable(table, id) {
    return await sqlHelpers.insertUpdateTable(table, { id, deleted: 1 });
}

module.exports = { getAllRowsFromTable, getRowByIdFromTable, createRowInTable, deleteRowByIdFromTable };
