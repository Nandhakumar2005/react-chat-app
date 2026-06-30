import { Box, List, Typography } from "@mui/material";
import RoomItem from "./RoomItem";

const rooms = [
  "General",
  "Programming",
  "Gaming",
  "Movies",
  "Music",
];

function Sidebar({ selectedRoom, setSelectedRoom }) {
  return (
    <Box
      sx={{
        width: 250,
        borderRight: "1px solid #ddd",
      }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Chat Rooms
      </Typography>

      <List>
        {rooms.map((room) => (
          <RoomItem
            key={room}
            room={room}
            selected={selectedRoom === room}
            onClick={() => setSelectedRoom(room)}
          />
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;