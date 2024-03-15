const { query } = require('../db/connect');
const { isEmpty } = require('../helpers/helpers');

async function getUserById(userId) {
    const getUserQuery = `
        SELECT
            users.id,
            users.name,
            users.departments_id,
            departments.name AS department
        FROM
            users
        INNER JOIN
            departments ON departments.id = users.departments_id
        WHERE
            users.id = ?`;

    const getUserParams = [userId];
    const userResult = await query(getUserQuery, getUserParams);

    if (isEmpty(userResult)) return {};

    const user = userResult[0];

    const getDepartmentPermissionsQuery = `
        SELECT
            department_permissions.from_department_id,
            department_permissions.to_department_id
        FROM
            department_permissions
        WHERE
            department_permissions.from_department_id = ? AND
            department_permissions.deleted = 0`;

    const getDepartmentPermissionsParams = [user.departments_id];
    user.department_permissions = await query(getDepartmentPermissionsQuery, getDepartmentPermissionsParams);

    return user;
}

module.exports = { getUserById };
