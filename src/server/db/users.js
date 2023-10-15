const db = require('./client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_COUNT = 8;
const JWT_SECRET = process.env.JWT_SECRET; 
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
}

const createUser = async({ name = 'first last', email, password, username }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user] } = await db.query(`
        INSERT INTO users(name, email, username, password)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, username, hashedPassword]);

        return user;
    } catch (err) {
        throw err;
    }
}
const validateUser = async (email, password) => {
    if (!email || !password) {
        return null;
    }

    try {
        const user = await getUserByEmail(email); // Fetch user by email from the database
        if (!user) return null;

        const hashedPassword = user.password; // Get the stored hashed password
        const passwordsMatch = await bcrypt.compare(password, hashedPassword); // Compare the given password with the hashed one

        if (!passwordsMatch) return null;
        
        delete user.password; // Don't send the hashed password to the client
        return user; // Return the user if email and password match
    } catch (err) {
        throw err;
    }
};

const getAllUsers = async() => {
    try {
        const { rows } = await db.query(`
        SELECT * 
        FROM users`);

        return rows;
    } catch (err) {
        throw err;
    }
}

const getUser = async({ email, password }) => {
    if (!email || !password) {
        return null;
    }
    try {
        const user = await getUserByEmail(email);
        if (!user) return null;

        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordsMatch) return null;

        const token = generateToken(user);
        delete user.password;

        return { user, token };
    } catch (err) {
        throw err;
    }
}

const getUserByEmail = async(email) => {
    try {
        const { rows: [user] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [email]);

        if (!user) {
            return null;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers,
    validateUser
};