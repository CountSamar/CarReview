const express = require('express')
const friendsRouter = express.Router();

const {
    createFriend,
    getFriends,
    getFriendsbyUserId
} = require('../db');

const jwt = require('jsonwebtoken')

friendsRouter.get('/:id', async( req, res, next) => {
    console.log(req.params.id, "id in friends")
    try {
        const friends = await getFriends(req.params.id);

        res.send({
            friends
        });
    } catch ({name, message}) {
        next({name, message})
    }
});

friendsRouter.post('/addfriend', async(req, res, next) => {
    const {userid, friendid } = req.body;
    if(!userid || !friendid) {
        next({
            name: 'MissingFriend',
            message: 'Please supply friend id'
        });
    }
    try {
        const friend = await createFriend({userid, friendid});
        if(friend) {
          

            res.send(friend);
        }
        else {
            next({
                name: 'MissingFriend',
                message: 'No user or no friend'
            });
        }
    } catch(err) {
        next(err);
    }
});

// friendsRouter.post('/register', async(req, res, next) => {
//     const { name, email, password } = req.body;

//     try {
//         const _user = await getUserByEmail(email);

//         if(_user) {
//             next({
//                 name: 'UserExistsError',
//                 message: 'A user with that email already exists'
//             });
//         }

//         const user = await createUser({
//             name,
//             email,
//             password
//         });

//         const token = jwt.sign({
//             id: user.id,
//             email
//         }, process.env.JWT_SECRET, {
//             expiresIn: '1w'
//         });

//         res.send({
//             message: 'Sign up successful!',
//             token
//         });
//     } catch({name, message}) {
//         next({name, message})
//     }
// })

module.exports = friendsRouter;