import React, { useRef } from "react";
import {
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  collection,
} from "firebase/firestore";
import { db } from "../firebase";

const MessageInput = ({
  messageText,
  setMessageText,
  currentUser,
  selectedUser,
}) => {
  const inputRef = useRef(null);

  const handleSend = async () => {
    console.log(currentUser, selectedUser);
    const docRef = await addDoc(collection(db, "messages"), {
      text: messageText,
      timestamp: serverTimestamp(),
      senderId: currentUser.uid,
      recipientId: selectedUser.id,
      sender: currentUser.email,
      recipient: selectedUser.email,
      status: "envoyé",
      pair: `${currentUser.uid}_${selectedUser.id}`,
    });

    console.log(docRef);
    console.log("Document written with ID: ", docRef.id);

    await updateDoc(doc(db, "messages", docRef.id), { status: "reçu" });

    setMessageText("");
    if (inputRef.current) {
      inputRef.current.style.height = "2rem"; // réinitialiser la hauteur de l'input
    }
  };

  return (
    <div className="flex items-center w-full px-6 py-4 bg-[#f5f7fa] border-t border-gray-200">
      <textarea
        ref={inputRef}
        value={messageText}
        onChange={(e) => {
          setMessageText(e.target.value);
          e.target.style.height = "2rem";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        placeholder="Écrivez un message..."
        className="flex-1 resize-none rounded-2xl border border-gray-300 p-3 mr-4 bg-white focus:outline-none focus:border-[#27ae60] transition"
        style={{ minHeight: "2rem", maxHeight: "6rem" }}
      />
      <button
        onClick={handleSend}
        className="bg-[#27ae60] text-white px-6 py-2 rounded-2xl hover:bg-[#14532d] transition"
      >
        Envoyer
      </button>
    </div>
  );
};

export default MessageInput;
