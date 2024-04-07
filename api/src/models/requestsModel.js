const sqlHelpers = require('../helpers/sqlHelpers');

async function getRequests() {
    return await sqlHelpers.selectAllTable('requests', { deleted: false });
}

async function getRequest(id) {
    return await sqlHelpers.selectTable('requests', { id, deleted: false });
}

async function createRequest(data) {
    var requests_materials = [];
    if (data.requests_materials) {
        requests_materials = data.requests_materials;
        delete data.requests_materials;
    }
    var request = await sqlHelpers.insertUpdateTable('requests', data);
    if (requests_materials.length > 0 && request && request.id) {
        request.requests_materials = [];
        requests_materials.forEach(async (material) => {
            material.request_id = request.id;
            var requests_material = await sqlHelpers.insertUpdateTable(
                'requests_materials',
                material
            );
            request.requests_materials.push(requests_material);
        });
    }
    return request;
}

async function deleteRequest(id) {
    return await sqlHelpers.insertUpdateTable('requests', {
        id,
        deleted: true,
    });
}

module.exports = { getRequests, getRequest, createRequest, deleteRequest };
