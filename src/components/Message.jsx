import { Paper, Typography } from "@mui/material";

function Message({ sender, text }) {
  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
      }}
    >
      <Typography fontWeight="bold">
        {sender}
      </Typography>

      <Typography>
        {text}
      </Typography>
    </Paper>
  );
}

export default Message;