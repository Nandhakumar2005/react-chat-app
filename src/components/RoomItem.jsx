import { ListItemButton, ListItemText } from "@mui/material";

function RoomItem({ room, selected, onClick }) {
  return (
    <ListItemButton
      selected={selected}
      onClick={onClick}
    >
      <ListItemText primary={room} />
    </ListItemButton>
  );
}

export default RoomItem;