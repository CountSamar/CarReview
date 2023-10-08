const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { createUser, getUserByEmail, getUser } = require('../db/client.js');
const db = require('../db/client');

const usersRouter = express.Router();

const {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers
} = require('../db');



usersRouter.get('/', async( req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send({
            users
        });
    } catch ({ name, message }) {
        next({ name, message });
    }
});

usersRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    console.log(password)
    if (!email || !password) {
        return next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }

    try {
        const user = await getUserByEmail(email);
        console.log(user)
        if (user) {
            const token = jwt.sign({
                id: user.id,
                email
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                message: 'Login successful!',
                token
            });
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch (error) {
        next(error);
    }
});

usersRouter.post('/register', async (req, res, next) => {
    const { name, email, password, username } = req.body;

    try {
        const _user = await getUserByEmail(email);

        if (_user) {
            return next({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser({
            name,
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({
            id: user.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: 'Sign up successful!',
            token
        });
    } catch ({ name, message }) {
        next({ name, message });
    }
});

module.exports = usersRouter;
