const sqlHelpers = require('../helpers/sqlHelpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isEmpty } = require('../helpers/helpers');

async function login(data) {
    const { login, password } = data;
    const user = await sqlHelpers.selectTable('users', { login, password });
    if (user) {
        const token = jwt.sign(user.id, process.env.JWT_SECRET, { expiresIn: 3600 });
        return { auth: true, token, user };
    } else {
        return { auth: false };
    }
}

async function register(data) {
    data.password = bcrypt.hashSync(data.password, 12);
    const result = await sqlHelpers.insertUpdateTable('users', data);
    if (result && !isEmpty(result)) {
        return await login(data);
    } else {
        return { error: true, message: 'Registration failed' };
    }
}

module.exports = { login, register };
