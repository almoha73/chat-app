import React from "react";



import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

function ChatRoom() {
 
  return (
    <>
      <div className="bg-primary w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl text-center mt-8">Chat</h1>
        <main className="lg:flex h-auto lg:h-screen mb-8 justify-center items-center w-11/12 border rounded-lg">
         <Sidebar />
         <ChatWindow /> 
        </main>
      </div>
    </>
  );
}

export default ChatRoom;
