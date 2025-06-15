import React from "react";
import Message from "./Message";

const MessageList = ({ messages, currentUser, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-4 max-h-[50vh] lg:max-h-none">
      {messages
        .sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds)
        .map((message) => (
          <Message key={message.id} message={message} currentUser={currentUser} />
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
