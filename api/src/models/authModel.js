const sqlHelpers = require('../helpers/sqlHelpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isEmpty } = require('../helpers/helpers');

async function login(data) {
    const { login, password } = data;
    const user = await sqlHelpers.selectTable('users', { login });
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isEmpty(user) && isValidPassword) {
        delete user.password;
        const { id } = user;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 3600 });
        return { auth: true, token, user };
    } else {
        return { auth: false };
    }
}

async function register(data) {
    const copyData = { ...data };
    data.password = bcrypt.hashSync(data.password, 12);
    const result = await sqlHelpers.insertUpdateTable('users', data);
    if (!isEmpty(result)) {
        return await login(copyData);
    } else {
        return { error: true, message: 'Registration failed' };
    }
}

module.exports = { login, register };
