const sqlHelpers = require('../helpers/sqlHelpers');

async function getAllRowsFromTable(table) {
    return await sqlHelpers.selectAllTable(table, { deleted: false });
}

async function getRowByIdFromTable(table, id) {
    return await sqlHelpers.selectTable(table, { id, deleted: false });
}

async function createRowInTable(table, request) {
    return await sqlHelpers.insertUpdateTable(table, request);
}

async function deleteRowByIdFromTable(table, id) {
    return await sqlHelpers.insertUpdateTable(table, { id, deleted: true });
}

module.exports = { getAllRowsFromTable, getRowByIdFromTable, createRowInTable, deleteRowByIdFromTable };
