const jwt = require('jsonwebtoken');

async function verifyJwt(token) {
    if (!token) return { error: true, message: 'No token provided' };
    let result = { auth: false, message: 'Failed to authenticate token' };
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            result = { auth: false, message: 'Invalid token' };
        }
        if (decoded) {
            result = { auth: true, id: decoded.id };
        }
    });
    return result;
}

module.exports = { verifyJwt };
