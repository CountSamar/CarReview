import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ChatHistory = () => {
  const { userName } = useParams(); // Get the userName parameter from the URL

  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Define the API endpoint URL using the userName
    const apiUrl = `http://localhost:5001/api/chats/${userName}`;
    console.log('API URL:', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setChats(data); // Assuming data is an array of chat objects
      })
      .catch((error) => {
        console.error('Error fetching chat history:', error);
      });
  }, [userName]);

  return (
    <div>
      <h2>Chat History</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.chat_id}>
            {/* Render chat details here */}
            <p>Review ID: {chat.review_id}</p>
            <p>User: {chat.user_name}</p>
            <p>Message: {chat.comm}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;


