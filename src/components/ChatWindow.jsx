import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import Message from "./Message";
import MessageInput from "./MessageInput";

function ChatWindow({ selectedRoom }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
        collection(db, "messages"),
        where("room", "==", selectedRoom)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setMessages(data);
    });

    return unsubscribe;
  }, [selectedRoom]);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: "auto",
        }}
      >
        {messages.map((message) => (
          <Message
            key={message.id}
            sender={message.sender}
            text={message.text}
          />
        ))}
      </Box>

      <MessageInput selectedRoom={selectedRoom} />
    </Box>
  );
}

export default ChatWindow;