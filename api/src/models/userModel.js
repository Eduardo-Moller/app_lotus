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
            public.users
        LEFT JOIN
            public.departments ON departments.id = users.departments_id
        WHERE
            users.id = ${userId}`;

    const userResult = await query(getUserQuery);

    if (isEmpty(userResult)) return {};

    const user = userResult[0];

    const getDepartmentPermissionsQuery = `
        SELECT
            department_permissions.from_department_id,
            department_permissions.to_department_id
        FROM
            public.department_permissions
        WHERE
            department_permissions.from_department_id = ${user.departments_id} AND
            department_permissions.deleted = false`;

    user.department_permissions = await query(getDepartmentPermissionsQuery);

    return user;
}

module.exports = { getUserById };
