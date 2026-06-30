import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

function MessageInput({ selectedRoom }) {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        sender: auth.currentUser.email,
        room: selectedRoom,
        createdAt: serverTimestamp(),
      });

      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
      }}
    >
      <TextField
        fullWidth
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button
        variant="contained"
        onClick={handleSend}
      >
        Send
      </Button>
    </Box>
  );
}

export default MessageInput;