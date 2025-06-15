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

  const deconnexion = async () => {
    await logout();
    navigate("/signin");
  };

  console.log(selectedUser);
  return (
    <>
      <div className="w-full h-screen flex flex-col bg-primary">
        {/* En-tête modernisé */}
        <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md rounded-t-lg">
          <h1 className="text-2xl font-bold text-[#27ae60]">Chat</h1>
          <button
            onClick={deconnexion}
            className="bg-[#14532d] hover:bg-[#27ae60] text-white px-5 py-2 rounded-full shadow transition font-semibold"
          >
            Déconnexion
          </button>
        </header>
        <main className="flex-1 flex flex-col lg:flex-row mb-0 lg:mb-8 justify-center items-stretch w-full lg:w-11/12 mx-auto border rounded-b-lg bg-[#F5F7FA] min-h-0">
          {currentUser ? (
            <>
              <Sidebar handleSelectUser={handleSelectUser} />
              {selectedUser ? (
                <ChatWindow key={selectedUser.id} selectedUser={selectedUser} />
              ) : (
                <div className="flex-1 flex flex-col justify-center items-center">
                  {/* Icône illustrative (optionnel) */}
                  <svg
                    className="w-20 h-20 mb-6 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 8h10M7 12h4m1 8.5a8.38 8.38 0 0 1-4.5-1.3c-.4-.2-.7-.5-.7-.9v-1.4c0-.4.3-.7.7-.9A8.38 8.38 0 0 1 12 19.5c2.2 0 4.2-.8 5.5-2.1.4-.2.7-.5.7-.9v-1.4c0-.4-.3-.7-.7-.9A8.38 8.38 0 0 1 12 19.5z"
                    />
                  </svg>
                  <span className="text-2xl md:text-3xl font-semibold text-gray-400 text-center">
                    Sélectionnez un utilisateur
                    <br />
                    pour commencer à discuter
                  </span>
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
