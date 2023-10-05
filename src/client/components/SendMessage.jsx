import React, { useState, useEffect } from 'react';
import { useWebSocket } from 'react-websocket'

const SendMessage = () => {
    const [socket, setSocket] = useState(null) 
    const [message, setMessage] = useState('')

  useEffect(() => {
    const newSocket = new WebSocket('ws.//localhost:3000')
    newSocket.onopen = function() {
        setSocket(newSocket)
    }
    return () => {
        newSocket.close()
    }
  }, []);

  const handleSendMessage = async () => {
    if (socket) {
        await socket.send(json.stringify({
            type: 'message',
            data: message
        }))
    }
  }
    return ( 
    <div>
        <input
        type='text'
        placeholder='Enter a message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        />
        <button onclick={handleSendMessage}>Send</button>
    </div>
    
    );
}
 
export default SendMessage;