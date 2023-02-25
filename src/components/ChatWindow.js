import React, { useState, useEffect, useContext } from "react";
import {
  addDoc,
  serverTimestamp,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      const messagesRef = collection(db, "messages");
      const queryRef = query(
        messagesRef,
        where("senderId", "==", currentUser.uid),
        orderBy("timestamp")
      );

      console.log(messagesRef);
      // Créer un listener pour récupérer les messages en temps réel
      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messages);
      });
      return () => {
        // Se désabonner du listener lorsque le composant est démonté
        unsubscribe();
      };
    }
  }, [currentUser]);

  const handleSend = async () => {
    const docRef = await addDoc(collection(db, "messages"), {
      text: messageText,
      timestamp: serverTimestamp(),
      senderId: currentUser.uid,
      sender: "me",
    });
    console.log(docRef);
    console.log("Document written with ID: ", docRef.id);

    setMessageText("");
  };

  return (
    <div className="flex-1 flex flex-col justify-end mr-8 mb-8 items-end h-full">
      {messages.map((message) => (
        <div key={message.id}>
          <p
            className={`border px-2 py-1 rounded-3xl mb-4 ${
              message.sender === "me"
                ? "bg-orange-500 text-white"
                : "bg-blue-500 text-black"
            }`}
          >
            {message.text}
          </p>
        </div>
      ))}
      <div className="flex ">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="mr-4 "
        />
        <button
          onClick={handleSend}
          className="border p-2 rounded-lg bg-tertiary text-white"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
