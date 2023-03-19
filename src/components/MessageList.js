import React from "react";
import Message from "./Message";

const MessageList = ({ messages, currentUser, messagesEndRef }) => {
  return (
    <div className="overflow-y-auto w-10/12 flex flex-col items-end h-auto">
      {messages.map((message) => (
        <Message key={message.id} message={message} currentUser={currentUser} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessageList;
