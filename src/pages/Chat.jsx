import { useState } from "react";
import { Box } from "@mui/material";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

function Chat() {
  const [selectedRoom, setSelectedRoom] = useState("General");

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <Box
        sx={{
          flex: 1,
          display: "flex",
        }}
      >
        <Sidebar
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />

        <ChatWindow selectedRoom={selectedRoom} />
      </Box>
    </Box>
  );
}

export default Chat;