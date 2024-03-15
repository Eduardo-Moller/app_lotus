const sqlHelpers = require('../helpers/sqlHelpers');

async function getRequests() {
    return await sqlHelpers.selectAllTable('requests', { deleted: false });
}

async function getRequest(id) {
    return await sqlHelpers.selectTable('requests', { id, deleted: false });
}

async function createRequest(request) {
    return await sqlHelpers.insertUpdateTable('requests', request);
}

async function deleteRequest(id) {
    return await sqlHelpers.insertUpdateTable('requests', { id, deleted: true });
}

module.exports = { getRequests, getRequest, createRequest, deleteRequest };
