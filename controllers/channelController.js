const router = require('express').Router();
const Channel = require('../db').model('Channel');
/*
    This controller is for managing user created channels
*/

// C
router.post('/', (req, res) => {
    let reqChan = req.body.channel;

    Channel.create({
        name : reqChan.name,
        tagline : reqChan.tagline,
        purpose : reqChan.purpose,
        UserId : req.user.id
    })
    .then(channel => res.status(200).json({ channel }))
    .catch(err => {
        console.log(err.message);
        res.status(500).json({ error : err.message });
    })
});

// R - all
router.get('/', (req, res) => {
    Channel.findAll()
        .then(channels => res.status(200).json(channels))
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ error : err.message });
        });
});

// R - id
router.get('/:id', (req, res) => {
    Channel.findOne({ where : { id : req.params.id }})
        .then(channel => res.status(200).json(channel))
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ error : err.message });
        });
});

// R - by user/token
router.get('/user/:id', (req, res) => {
    Channel.findAll({ where : { UserId : req.params.id }})
    .then(channels => res.status(200).json(channels))
    .catch(err => {
        console.log(err.message);
        res.status(500).json({ error : err.message });
    });
});

// U
router.put('/:id', (req, res) => {
    let reqChan = req.body.channel;

    Channel.update({
        name : reqChan.name,
        tagline : reqChan.tagline,
        purpose : reqChan.purpose,
    }, 
        { where : { 
            id : req.params.id, UserId : req.user.id 
        }})
        .then(recordsChanged => res.status(200).json({ msg : `${recordsChanged} record(s) changed.`}))
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ error : err.message})
        });
});


// D
router.delete('/:id', (req, res) => {
    Channel.destroy({ where : { id : req.params.id, UserId : req.user.id }})
    .then(recordsChanged => res.status(200).json({ msg : `${recordsChanged} record(s) deleted. `}))
    .catch(err => {
        console.log(err.message);
        res.status(500).json({ error : err.message });
    })
});

module.exports = router;