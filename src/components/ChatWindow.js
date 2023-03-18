import React, { useState, useEffect, useContext, useRef } from "react";
import {
  addDoc,
  serverTimestamp,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const inputRef = useRef(null); // ref pour l'input

  const messagesEndRef = useRef(null);

  const mergeMessages = (messages1, messages2) => {
    const combinedMessages = [...messages1, ...messages2];
    const uniqueMessages = [];

    combinedMessages.forEach((message) => {
      if (
        !uniqueMessages.some((uniqueMessage) => uniqueMessage.id === message.id)
      ) {
        uniqueMessages.push(message);
      }
    });

    uniqueMessages.sort((a, b) => {
      if (a.timestamp && b.timestamp) {
        return a.timestamp.toMillis() - b.timestamp.toMillis();
      } else {
        return 0;
      }
    });

    return uniqueMessages;
  };

  // Écoutez les messages envoyés par currentUser
  useEffect(() => {
    if (currentUser && selectedUser && currentUser.uid && selectedUser.id) {
      const messagesRef = collection(db, "messages");

      const queryRef1 = query(
        messagesRef,
        where("senderId", "==", currentUser.uid),
        where("recipientId", "==", selectedUser.id),
        orderBy("timestamp")
      );

      const unsubscribe = onSnapshot(queryRef1, (snapshot) => {
        const messages1 = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages((prevMessages) => mergeMessages(prevMessages, messages1));
      });
      return () => unsubscribe(); // Nettoyez l'abonnement lorsqu'il est terminé
    }
  }, [currentUser, selectedUser]);

  // Écoutez les messages envoyés par selectedUser
  useEffect(() => {
    if (currentUser && selectedUser && currentUser.uid && selectedUser.id) {
      const messagesRef = collection(db, "messages");

      const queryRef2 = query(
        messagesRef,
        where("senderId", "==", selectedUser.id),
        where("recipientId", "==", currentUser.uid),
        orderBy("timestamp")
      );

      const unsubscribe = onSnapshot(queryRef2, (snapshot) => {
        const messages2 = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages((prevMessages) => mergeMessages(prevMessages, messages2));
      });

      return () => unsubscribe(); // Nettoyez l'abonnement lorsqu'il est terminé
    }
  }, [currentUser, selectedUser]);

  // ...

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

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);

  console.log("Messages:", messages);
  return (
    <div className="h-[calc(100vh-200px)] flex-1 flex flex-col justify-end items-end">
      <div
        ref={messagesEndRef}
        className="overflow-y-auto w-10/12 flex flex-col items-end h-auto"
      >
        {messages.map((message) => (
          <div
            key={message.id}
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
                message.status === "envoyé"
                  ? "border-orange-500"
                  : "border-blue-500"
              } max-w-4/5`}
              style={{ maxWidth: message.text.length < 20 ? "50%" : "80%" }}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>
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
    </div>
  );
};

export default ChatWindow;
