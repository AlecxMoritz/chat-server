const jwt = require('jsonwebtoken');
const User = require('../db').model('User');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, process.env.secret, (err, decoded) => {
            if(decoded) {
                User.findOne({ where : { id : decoded.id }})
                    .then(user => {
                        if(user) {
                            req.user = user;
                            next();
                        } else {
                            res.status(401).json({ error : 'Unauthorized '})            
                        }
                    })
            } else {
                res.status(402).json({ error : 'Unauthorized '})
            }
        })
    } else {
        return res.status(403).json({ error : 'Ya ain\'t authorized' });
    }
}

module.exports = validateSession;