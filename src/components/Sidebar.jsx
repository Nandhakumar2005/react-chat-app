import { useEffect, useState } from "react";
import {
  Box,
  List,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db, auth } from "../firebase/firebase";

function Sidebar({ selectedRoom, setSelectedRoom }) {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState("");

  // Fetch rooms in real-time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "rooms"), (snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return unsub;
  }, []);

  // Create new room
  const handleAddRoom = async () => {
    if (!newRoom.trim()) return;

    await addDoc(collection(db, "rooms"), {
      name: newRoom.trim(),
      createdBy: auth.currentUser?.email || "unknown",
      createdAt: serverTimestamp(),
    });

    setNewRoom("");
  };

  // Delete room safely
  const handleDeleteRoom = async (room) => {
    await deleteDoc(doc(db, "rooms", room.id));

    // If current room is deleted → fallback to General
    if (selectedRoom === room.name) {
      setSelectedRoom("General");
    }
  };

  return (
    <Box sx={{ width: 250, borderRight: "1px solid #ddd", p: 2 }}>
      
      {/* Title */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Chat Rooms
      </Typography>

      {/* Create room input */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField
          size="small"
          placeholder="New room"
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          fullWidth
        />

        <Button variant="contained" onClick={handleAddRoom}>
          +
        </Button>
      </Box>

      {/* Rooms list */}
      <List>
        {rooms.map((room) => (
          <Box
            key={room.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
              borderRadius: 1,
              cursor: "pointer",
              "&:hover": { background: "#f5f5f5" },
              backgroundColor:
                selectedRoom === room.name ? "#e3f2fd" : "transparent",
            }}
          >
            {/* Room name */}
            <Typography
              onClick={() => setSelectedRoom(room.name)}
              sx={{ flex: 1 }}
            >
              {room.name}
            </Typography>

            {/* Delete button */}
            <Button
              size="small"
              color="error"
              onClick={() => handleDeleteRoom(room)}
            >
              X
            </Button>
          </Box>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;