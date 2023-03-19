import React from "react";

const Message = ({ message, currentUser }) => {
  return (
    <div
      className={`flex justify-${
        message.senderId === currentUser.uid ? "end" : "start"
      } w-full mr-4`}
    >
      <p
        className={`border px-2 py-1 rounded-3xl mb-8 ml-4 ${
          message.senderId === currentUser.uid
            ? "bg-orange-500 text-white"
            : "bg-blue-500 text-black"
        } ${
          message.status === "envoyé" ? "border-orange-500" : "border-blue-500"
        } max-w-4/5`}
        style={{ maxWidth: message.text.length < 20 ? "50%" : "80%" }}
      >
        {message.text}
      </p>
    </div>
  );
};

export default Message;
