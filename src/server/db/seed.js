const db = require('./client');
const { createUser } = require('./users');

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
    username: 'johndoe'
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
    username: 'johndoe'
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
    username: 'johndoe'
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
    username: 'johndoe'
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
    username: 'johndoe'
  },
  // Add more user objects as needed
];  

const dropTables = async () => {
    try {
        await db.query(`
        DROP TABLE IF EXISTS users;
        `)
    }
    catch(err) {
        throw err;
    }
}

const createTables = async () => {
    try{
        await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )`)
    }
    catch(err) {
        throw err;
    }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({name: user.name, email: user.email, username: user.username, password: user.password});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const seedDatabse = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertUsers();
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()
