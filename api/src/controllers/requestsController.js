const requestsModel = require('../models/requestsModel.js');

async function getRequests() {
    return await requestsModel.getRequests();
}

async function getRequest(id) {
    return await requestsModel.getRequest(id);
}

async function createRequest(request) {
    return await requestsModel.createRequest(request);
}

async function deleteRequest(id) {
    return await requestsModel.deleteRequest(id);
}

module.exports = { getRequests, getRequest, createRequest, deleteRequest };
