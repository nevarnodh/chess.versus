import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatComponent = ({ gameId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        axios.get(`/api/chat/${gameId}`)
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching chat messages:', error);
            });
    }, [gameId]);

    const sendMessage = () => {
        axios.post('/api/chat/send', { game_id: gameId, content: newMessage })
            .then(response => {
                setMessages([...messages, { content: newMessage }]);
                setNewMessage('');
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    return (
        <div>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index}>{msg.content}</div>
                ))}
            </div>
            <input 
                type="text" 
                value={newMessage} 
                onChange={e => setNewMessage(e.target.value)} 
                placeholder="Type a message" 
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatComponent;

