import React, { useState, useEffect, useContext, useRef } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { mergeMessages } from "../utils/utils";

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);

  console.log("Messages:", messages);
  return (
    <div className="h-[calc(100vh-200px)] flex-1 flex flex-col justify-end items-end">
      <MessageList
        messages={messages}
        currentUser={currentUser}
        messagesEndRef={messagesEndRef}
      />
      <MessageInput
        messageText={messageText}
        setMessageText={setMessageText}
        currentUser={currentUser}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default ChatWindow;
