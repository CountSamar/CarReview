const db = require('./client')


const createFriend = async({userid, friendid }) => {
    
    try {
        const { rows: [friend] } = await db.query(`
        INSERT INTO friends (userid, friendid)
        VALUES($1, $2)
        RETURNING *`, [userid, friendid]);

        return friend;
    } catch (err) {
        throw err;
    }
}

const getFriends = async(userid) => {
    
    if(!userid) {
         return;
     }
    try {
        const friends = await getFriendsbyUserId(userid);
        if(!friends) return;
        return friends;
    } catch (err) {
        throw err;
    }
}

async function getFriendsbyUserId (userid) {
    console.log(userid, "my userid")
    try {
        const { rows } = await db.query(`
        SELECT * 
        FROM friends
        WHERE userid=$1`, [ userid ]);

        return rows;
    } catch (err) {
        throw err;
    }
}


module.exports = {
    createFriend,
    getFriends,
    getFriendsbyUserId
};