// import React, {useState, useEffect} from 'react'

// export default function Friend() {
//     const [friends, setFriends] = useState([])
//     useEffect(() => {
//         async function fetchFriends() {
//           try {
//             const response = await fetch('http://localhost:3000/api/friends/1');
//             const result = await response.json();
//             setFriends(result.friends);
//           } catch (error) {
//             console.error(error);
//           }
//         }
//        fetchFriends()
//       }, []);

//   return (
//     <div>Friend</div>
//   )
// }
// import React, {useState, useEffect} from 'react'

// export default function Friend() {
//     const [friends, setFriends] = useState([])
//     useEffect(() => {
//         // let myuserid = localStorage.getItem("myuserid") // 1 or 2 
//         let myuserid = 3;
//         async function fetchFriends() {
//           try {
//             const response = await fetch(`http://localhost:3000/api/friends/${myuserid}`);
//             const result = await response.json();
//             console.log("result", result.friends) ;
//             setFriends(result.friends);
//           } catch (error) {
//             console.error(error);
//           }
//         }
//        fetchFriends()
//       }, []);

//   return (
//     <div>
//         <h1>Friends</h1>
//         {friends.length > 0 && friends.map((friend)=> {
//         return(
//             <div key={friend.friendid} >
//                 <h4>{friend.name}</h4>
//             </div>
//         )
//         })}
//     </div>
//   )
// }
