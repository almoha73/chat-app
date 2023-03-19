import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { AuthContext } from "../context/AuthContext";
import Signin from "../pages/SignIn";

function ChatRoom() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const deconnexion = () => {
    logout();
    navigate("/signin");
  };

  console.log(selectedUser);
  return (
    <>
      <div className="bg-primary w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl text-center mt-8">Chat</h1>
        <button onClick={deconnexion} className="border p-1">
          logout
        </button>
        <main className="lg:flex h-auto lg:h-screen mb-8 justify-center items-center w-11/12 border rounded-lg">
          {currentUser ? (
            <>
              <Sidebar handleSelectUser={handleSelectUser} />
              {selectedUser ? (
                <ChatWindow key={selectedUser.id} selectedUser={selectedUser} />
              ) : (
                <div className="flex-1 flex justify-center items-center text-4xl font-bold text-gray-400">
                  Sélectionnez un utilisateur pour commencer à discuter
                </div>
              )}
            </>
          ) : (
            <Signin />
          )}
        </main>
      </div>
    </>
  );
}

export default ChatRoom;
