import React, { useState, useContext } from 'react';
import { MessageContext } from '../context/MessageContext';
import './ChatBox.css';

const ChatBox: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const context = useContext(MessageContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { messages, sendMessage } = context;

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
