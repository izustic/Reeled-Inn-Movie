import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

function AdminChat({ userId }) {
  const messagesRef = firebase.firestore()
    .collection("users")
    .doc(userId)
    .collection("chats")
    .doc("admin")
    .collection("messages");

  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: "admin",
      displayName: "Admin",
      photoURL: "",
    });
    setFormValue("");
  };

  return (
    <>
      {messages &&
        messages.map((msg) => (
          <div key={msg.id}>
            <p>{msg.text}</p>
          </div>
        ))}
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}

export default AdminChat;














