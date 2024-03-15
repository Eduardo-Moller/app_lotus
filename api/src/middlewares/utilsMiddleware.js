const utilsTables = ['departments', 'enterprises', 'materials', 'status', 'urgency_level'];

async function checkUtilsTable(req, res) {
    const table = req.params.table;
    if (utilsTables.includes(table)) {
        return true;
    } else {
        res.status(400).json('Invalid request: Table not found in permission utils table list.');
    }
}

module.exports = { checkUtilsTable };
