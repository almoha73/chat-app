import React, { useState, useEffect, useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Sidebar = ({ handleSelectUser }) => {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const allUsers = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((user) => user.id !== currentUser?.uid);
      setUsers(allUsers);
    };
    fetchUsers();
  }, [currentUser]);

  const handleSearch = async () => {
    if (searchText) {
      const usersRef = collection(db, "users");
      const queryRef = query(usersRef, where("nom", "==", searchText));
      const snapshot = await getDocs(queryRef);
      const foundUsers = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((user) => user.id !== currentUser?.uid);
      setUsers(foundUsers);
    } else {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const allUsers = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((user) => user.id !== currentUser?.uid);
      setUsers(allUsers);
    }
  };

  const handleUserClick = (user) => {
    handleSelectUser(user);
  };

  return (
    <aside className="flex flex-col w-full lg:w-80 h-1/3 lg:h-full bg-[#14532d] text-white shadow-lg">
      <div className="p-4 border-b border-[#27ae60]">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Rechercher un utilisateur"
          className="p-2 rounded-lg w-full border-none bg-[#23272f] text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-[#27ae60] px-4 py-2 rounded-lg mt-2 w-full hover:bg-[#14532d] transition"
        >
          Rechercher
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 cursor-pointer p-3 hover:bg-[#27ae60] hover:text-white transition"
            onClick={() => handleUserClick(user)}
          >
            <div className="w-10 h-10 rounded-full bg-[#27ae60] flex items-center justify-center text-lg font-bold uppercase">
              {user.nom?.charAt(0)}
            </div>
            <div>
              <div className="font-semibold">{user.nom}</div>
              <div className="text-xs text-[#e9fbe5]">{user.email}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;