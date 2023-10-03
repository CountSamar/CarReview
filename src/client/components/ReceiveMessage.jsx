import React, { useState, useEffect } from 'react';
import { useWebSocket } from 'react-websocket';

const ReceiveMessage = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:3001');
    newSocket.onopen = function() {
      setSocket(newSocket);
    };

    newSocket.onmessage = function(event) {
      const message = JSON.parse(event.data);
      setMessages([...messages, message]);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReceiveMessage;