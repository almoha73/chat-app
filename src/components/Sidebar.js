import React, {useState} from "react"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";




 const Sidebar = ({ handleSelectUser}) => {
  
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    console.log(searchText);
    if (searchText) {
      const usersRef = collection(db, "users");
      const queryRef = query(usersRef, where("name", "==", searchText));

      const snapshot = await getDocs(queryRef);
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(users);
      setUsers(users);
    } else {
      setUsers([]);
    }
  };

  const handleUserClick = (user) => {
    console.log(user);
    console.log(handleSelectUser(user));
    handleSelectUser(user);
  };

  return (
    <div className="flex flex-2 flex-col w-80 h-full border-r-2 border-black bg-indigo-200 text-black ">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b-2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Rechercher un utilisateur"
            className="p-2 rounded-lg w-full border-2 border-gray-300"
          />
          <button
            onClick={handleSearch}
            className="bg-gray-200 px-4 py-2 rounded-lg mt-2"
          >
            Rechercher
          </button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              className="cursor-pointer p-2 border-b-2"
              onClick={()=>handleUserClick(user)}
            >
              {user.name} ({user.email})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar