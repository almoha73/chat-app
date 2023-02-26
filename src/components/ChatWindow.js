import React, { useState, useEffect, useContext, useRef } from "react";
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
  //const [inputHeight, setInputHeight] = useState("auto");
  const { currentUser } = useContext(AuthContext);
  const inputRef = useRef(null); // ref pour l'input
  const messagesEndRef = useRef(null);


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
    inputRef.current.style.height = "2rem"; // réinitialiser la hauteur de l'input
  };

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);
  

  return (
    <div  className="h-[calc(100vh-200px)] flex-1 flex flex-col justify-end  items-end ">
      <div ref={messagesEndRef} className="overflow-y-auto w-9/12 flex  flex-col items-end">
      {messages.map((message) => (
        <div key={message.id} className="flex justify-end w-full mr-4">
          <p
            className={`border px-2 py-1 rounded-3xl mb-8 ${
              message.sender === "me"
                ? "bg-orange-500 text-white"
                : "bg-blue-500 text-black"
            }  max-w-4/5 `}
             style={{ maxWidth: message.text.length < 20 ? '50%' : '80%' }}
          >
            {message.text}
          </p>
        </div>
      ))}
      </div>
      <div className="flex justify-end  w-full p-4 fixed bottom-6">
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
          style={{ height: "2rem",  }}
        />
        <button
          onClick={handleSend}
          className="border p-2 rounded-lg bg-tertiary text-white h-8"
          
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
