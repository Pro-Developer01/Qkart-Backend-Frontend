import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import { Typography } from "@mui/material";


const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
  const username = localStorage.getItem("username");
  return (
    <Box className="header">
      <Box className="header-title" onClick={()=>{history.push('/')}}>
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {/* //SearchBar */}
      {children}

      {/* //rightButtons */}
      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/")}
        >
          Back to explore
        </Button>
      ) : username?.length > 0 ? (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Avatar alt={username} src="avatar.png"></Avatar>
          <Typography> {username}</Typography>
          <button
            className="logOutButton"
            onClick={() => {
              localStorage.clear();
              
              window.location.reload();
            }}
          >
            LOGOUT
          </button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => history.push("/login")}>
            {" "}
            Login
          </Button>
          <Button variant="contained" onClick={() => history.push("/register")}>
            {" "}
            Register
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Header;

