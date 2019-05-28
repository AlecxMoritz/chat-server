const router = require('express').Router();
const UserChannel = require('../db').model('UserChannel');
const Channels = require('../db').model('Channel');
/*
    This controller is for managing channels a user may join
*/

// C - 'join' a channel
router.post('/:id', (req, res) => {
    UserChannel.create({
        ChannelId : req.params.id,
        UserId : req.user.id
    })
    .then(channel => res.status(200).json({ channel }))
    .catch(err => {
        console.log(err.message);
        res.status(500).json({ error : err.message });
    })
});

// R - by user/token - get all channels 'joined'
router.get('/', (req, res) => {
    UserChannel.findAll({
        include : [{ model : Channels }]
    }, {
        where : {
            UserId : req.user.id
        }
    })
    .then(channels => res.status(200).json(channels))
    .catch(err => {
        console.log(err.message);
        res.status(500).json({ error : err.message });
    });
});

// D
router.delete('/:id', (req, res) => {
    UserChannel.destroy({ where : { id : req.params.id, UserId : req.user.id }})
    .then(recordsChanged => res.status(200).json({ msg : `${recordsChanged} record(s) deleted. `}))
    .catch(err => {
        console.log(err.message);
        res.status(500).json({ error : err.message });
    })
});

module.exports = router;