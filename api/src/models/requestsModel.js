const sqlHelpers = require("../helpers/sqlHelpers");

async function getRequests() {
  return await sqlHelpers.selectAllTable("requests", { deleted: false });
}

async function getRequest(id) {
  return await sqlHelpers.selectTable("requests", { id, deleted: false });
}

async function createRequest(data) {
  var request = await sqlHelpers.insertUpdateTable("requests", data);
  if (data.requests_materials.length > 0 && request && request.id) {
    request.requests_materials = [];
    data.requests_materials.forEach(async (material) => {
      var requests_material = await sqlHelpers.insertUpdateTable(
        "requests_materials",
        { ...material, request_id: request.id }
      );
      request.requests_materials.push(requests_material);
    });
  }
  return request;
}

async function deleteRequest(id) {
  return await sqlHelpers.insertUpdateTable("requests", { id, deleted: true });
}

module.exports = { getRequests, getRequest, createRequest, deleteRequest };
