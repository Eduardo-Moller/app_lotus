const query = require('../db/connect');

/**
 * Função que insere ou atualiza registros em uma tabela do banco de dados.
 * Verifica se o objeto de dados possui um campo 'id':
 *   - Se 'id' estiver presente, realiza uma atualização na tabela com os valores fornecidos.
 *   - Se 'id' não estiver presente, insere um novo registro na tabela com os valores fornecidos.
 * @param {string} table O nome da tabela onde os dados serão inseridos ou atualizados.
 * @param {Object} data Um objeto contendo os campos e valores a serem inseridos ou atualizados na tabela.
 * @returns {Promise} Uma promessa que será resolvida com o resultado da operação de inserção ou atualização.
 */
async function insertUpdateTable(table, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    let sql;
    if (fields.includes('id')) {
        const idIndex = fields.indexOf('id');
        const id = values[idIndex];

        const checkField = selectTable(table, { id });
        if (!checkField) return {};
        if (checkField && checkField.updated) {
            fields.push('updated');
            values.push('NOW()');
        }
        fields.splice(idIndex, 1);
        values.splice(idIndex, 1);

        const updates = fields.map((field) => `${field} = ?`).join(', ');
        sql = `UPDATE ${table} SET ${updates} WHERE id = ?`;
        values.push(id);
    } else {
        const placeholders = values.map(() => '?').join(', ');
        sql = `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${placeholders})`;
    }

    return await query(sql, values);
}

/**
 * Função que realiza uma consulta para selecionar um único registro de uma tabela do banco de dados, com base nos filtros fornecidos.
 * Constrói uma consulta SQL dinâmica com base nos campos e valores dos filtros.
 * @param {string} table O nome da tabela onde a consulta será realizada.
 * @param {Object} filters Um objeto contendo os campos e valores a serem usados como filtros na consulta.
 * @returns {Promise} Uma promessa que será resolvida com o resultado da consulta.
 */
async function selectTable(table, filters) {
    const fields = Object.keys(filters);
    const values = Object.values(filters);

    if (!table || !fields.length || !values.length) return {};

    const where = fields.map((field) => `${field} = ?`).join(' AND ');
    const sql = `SELECT * FROM ${table} WHERE ${where} LIMIT 1`;

    return await query(sql, values);
}

/**
 * Função que realiza uma consulta para selecionar todos os registros de uma tabela do banco de dados, com base nos filtros fornecidos.
 * Constrói uma consulta SQL dinâmica com base nos campos e valores dos filtros.
 * @param {string} table O nome da tabela onde a consulta será realizada.
 * @param {Object} filters Um objeto contendo os campos e valores a serem usados como filtros na consulta.
 * @returns {Promise} Uma promessa que será resolvida com o resultado da consulta.
 */
async function selectAllTable(table, filters) {
    const fields = Object.keys(filters);
    const values = Object.values(filters);

    let sql;

    if (!table && fields.length && values.length) {
        return {};
    } else if (table || !fields.length || !values.length) {
        sql = `SELECT * FROM ${table}`;
    } else {
        const where = fields.map((field) => `${field} = ?`).join(' AND ');
        sql = `SELECT * FROM ${table} WHERE ${where}`;
    }

    return await query(sql, values);
}

module.exports = { insertUpdateTable, selectTable, selectAllTable };
