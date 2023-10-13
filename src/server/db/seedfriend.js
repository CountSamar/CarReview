const db = require("./client");
const {createFriend}= require("./friends")

const createFriendsTable = async () => {
    try {
      await db.query(`
      CREATE TABLE friends (
        id SERIAL PRIMARY KEY,
        userid INT,
        friendid INT,
        FOREIGN KEY (userid) REFERENCES users(id),
        FOREIGN KEY (friendid) REFERENCES users(id)
        )`);
    } catch (err) {
      throw err;
    }
  };


const seedDatabase = async () => {
    try {
      db.connect();
     await createFriendsTable();
  
      
    } catch (err) {
      throw err;
    } finally {
      db.end();
    }
  };
  seedDatabase().catch((err) => {
    console.error("Failed to seed database:", err);
  });
  