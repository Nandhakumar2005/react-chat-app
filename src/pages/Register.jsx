import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/chat");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ece9e6, #ffffff)",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 4,
          width: 360,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" textAlign="center" fontWeight="bold">
          Register
        </Typography>

        <form
          onSubmit={handleRegister}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ padding: 1 }}
          >
            Register
          </Button>
        </form>

        <Typography variant="body2" textAlign="center">
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              fontWeight: 500,
            }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;