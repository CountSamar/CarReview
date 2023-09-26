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

const getFriends = async({userid, friendid}) => {
    if(!userid || !friendid) {
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

const getFriendsbyUserId = async(userid) => {
    try {
        const { rows: [ friend ] } = await db.query(`
        SELECT * 
        FROM friends
        WHERE userid=$1;`, [ userid ]);

        if(!friend) {
            return;
        }
        return friend;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createFriend,
    getFriends,
    getFriendsbyUserId
};