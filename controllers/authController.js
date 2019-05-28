const router = require('express').Router();
const User = require('../db').model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    let reqUser = req.body.user;

    User.create({
        screenname : reqUser.screenname,
        email : reqUser.email,
        name : reqUser.name,
        password : bcrypt.hashSync(reqUser.password, 10)
    })
    .then(user => {
        let token = jwt.sign({ id : user.id }, process.env.secret, { expiresIn : 60 * 60 * 24 });

        res.status(200).json({ user : user, token : token });
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).json({ error : err.message });
    })
});

router.post('/signin', (req, res) => {
    let reqUser = req.body.user;

    User.findOne({ where : { email : reqUser.email }})
        .then(user => {
            if(user) {
                bcrypt.compare(reqUser.password, user.password, (err, matches) => {
                    if(matches) {
                        let token = jwt.sign({ id : user.id }, process.env.secret, { expiresIn : 60 * 60 * 24 });

                        res.status(200).json({ user : user, token : token });
                    } else {
                        res.status(501).json({ error : 'Email or password does not match 1' });        
                    }
                })
            } else {
                res.status(501).json({ error : 'Email or password does not match 2' });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ error : err.message })
        })
})
module.exports = router;