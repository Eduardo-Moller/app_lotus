const sqlHelpers = require('../helpers/sqlHelpers');

async function getRequests() {
    return await sqlHelpers.selectAllTable('requests');
}

async function getRequest(id) {
    return await sqlHelpers.selectTable('requests', { id, deleted: 0 });
}

async function createRequest(request) {
    return await sqlHelpers.insertUpdateTable('requests', request);
}

async function deleteRequest(id) {
    return await sqlHelpers.insertUpdateTable('requests', { id, deleted: 1 });
}

module.exports = { getRequests, getRequest, createRequest, deleteRequest };
