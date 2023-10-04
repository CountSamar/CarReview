import React, {useState, useEffect} from 'react'

export default function Friend() {
    const [friends, setFriends] = useState([])
    useEffect(() => {
        async function fetchFriends() {
          try {
            const response = await fetch('http://localhost:3000/api/friends/1');
            const result = await response.json();
            console.log("result", result.friends) ;
            setFriends(result.friends);
          } catch (error) {
            console.error(error);
          }
        }
       fetchFriends()
      }, []);

  return (
    <div>
        <h1>Friends</h1>
    </div>
  )
}
