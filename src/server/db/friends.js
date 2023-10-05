const db = require('./client')


const createFriend = async({userid, friendid}) => {
    console.log(`${userid} and ${friendid}`)
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
        SELECT friends.userid, friends.friendid, users.name 
        FROM users
        INNER JOIN friends
        ON friends.friendid = users.id
        WHERE friends.userid=$1`, [ userid ]);

        return rows;
    } catch (err) {
        throw err;
    }
}


module.exports = {
    createFriend,
    getFriends
};