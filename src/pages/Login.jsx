import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { padding } from "@mui/system";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('username',username)
    navigate('/home');

  }

  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', justifyContent: 'center', marginTop: "4rem" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // minHeight: "50vh",
          flexDirection: "column",
          border: "1px solid gray",
          width: '30rem',
          padding: "1rem",
          paddingBottom: "3rem"
        }}
      >
        <div>
          <Typography variant="h2" sx={{ margin: "2rem" }}>
            Login
          </Typography>
        </div>
        <div style={{ margin: "2rem" }}>
          <TextField
            sx={{ marginRight: "1rem" }}
            id="username"
            required
            InputLabelProps={{ required: false }}
            inputProps={{
              autoComplete: 'off'
           }}
            type="text"
            label="username"
            variant="outlined"
            value={username}
            onChange={(even) => setUsername(even.target.value)}
          />
          <TextField
            id="password"
            required
            InputLabelProps={{ required: false }}
            type="password"
            label="password"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <Button type="submit" size="large" variant="contained">Login</Button>
        </div>
      </Box>
    </form>
  );
}

export default Login;
