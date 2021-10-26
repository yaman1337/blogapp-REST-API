const jwt = require('jsonwebtoken');
const { secretKey } = require('../env');
const User = require('../models/Users');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(403).json({ error: "You are not logged in." });
    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, secretKey, (err, payload) => {
        if (err) return res.status(403).json({ error: "You are not logged in." });
        const id = payload.id ? payload.id : 'null';
        User.findById(id)
            .then(data => {
                req.user = data;
                next();
            })
    })
}
