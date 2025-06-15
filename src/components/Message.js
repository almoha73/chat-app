import React from "react";

const Message = ({ message, currentUser }) => {
  const isMe = message.senderId === currentUser.uid;
  return (
    <div className={`flex w-full ${isMe ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`px-4 py-2 rounded-2xl shadow 
          ${isMe 
            ? "bg-[#27ae60] text-white rounded-br-none"   // vert principal pour moi
            : "bg-[#e9fbe5] text-[#14532d] rounded-bl-none"} // vert clair pour l'autre
          max-w-[70%] break-words`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default Message;
