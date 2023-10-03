const db = require('./client');
const { createUser } = require('./users');

const users = [
  { name: 'Emily Johnson', email: 'emily@example.com', password: 'securepass', username: 'emilyjohn' },
  { name: 'Liu Wei', email: 'liu@example.com', password: 'strongpass', username: 'liwei' },
  { name: 'Isabella García', email: 'bella@example.com', password: 'pass1234', username: 'isabellagar' },
  { name: 'Mohammed Ahmed', email: 'mohammed@example.com', password: 'mysecretpassword', username: 'floatlikeabee' },
  { name: 'John Smith', email: 'john@example.com', password: 'password123', username: 'jsmith' },
  { name: 'Jane Doe', email: 'jane@example.com', password: 'janepassword', username: 'jdoe' },
  { name: 'Robert Brown', email: 'robert@example.com', password: 'robertpass', username: 'rbrown' },
  { name: 'Linda White', email: 'linda@example.com', password: 'lindapassword', username: 'lwhite' },
  { name: 'Michael Green', email: 'michael@example.com', password: 'michaelpass', username: 'mgreen' },
  { name: 'Jennifer Blue', email: 'jennifer@example.com', password: 'jenniferpass', username: 'jblue' }
];



const dropTables = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS users;`);
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) DEFAULT 'name',
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )`);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      const insertedUser = await createUser({ 
        name: user.name, 
        email: user.email, 
        username: user.username, 
        password: user.password 
      });

      // Check the return value to log the outcome
      if (insertedUser) {
        console.log(`User ${insertedUser.name} added with ID ${insertedUser.id}`);
      } else {
        console.log(`User with email ${user.email} was not added (possibly due to a conflict).`);
      }
    }
    console.log('Finished inserting seed data.');
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
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabse();
