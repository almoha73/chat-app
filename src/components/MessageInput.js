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
    <div className="flex justify-end w-full p-4 fixed bottom-6">
      <textarea
        ref={inputRef}
        type="text"
        value={messageText}
        onChange={(e) => {
          setMessageText(e.target.value);
          e.target.style.height = "2rem"; // réinitialiser la hauteur de l'input
          e.target.style.height = e.target.scrollHeight + "px"; // ajuster la hauteur de l'input
        }}
        className="mr-4 p-2 min-h-4  max-h-32 resize-none rounded-3xl" // ajouter une hauteur minimale à l'input
        style={{ height: "2rem" }}
      />
      <button
        onClick={handleSend}
        className="border p-2 rounded-lg bg-tertiary text-white h-8"
      >
        Envoyer
      </button>
    </div>
  );
};

export default MessageInput;
