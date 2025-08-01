import React, { useEffect, useState } from 'react';
import {Box, IconButton, MenuItem, Select, Stack, Tooltip, useMediaQuery} from "@mui/material"
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import logo from '../../img/typeitLogo.png'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import './navbar.css'
import { Logout } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth_redux/authAction';

function Navbar() {
    const navigate = useNavigate();

    // check if the user is already logged in 
  const {isUser, username} = useSelector(state => state.auth)
  const isMobile = useMediaQuery("(max-width:768px)");
const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
<Stack
  direction={"row"}
  justifyContent={"space-around"}
  alignItems={"center"}
  padding={2}
  width={"100vw"}
  bgcolor="transparent"
>
  {/* Logo */}
  <Box>
    <img src={logo} alt="logo" height={50} width={150} />
  </Box>

  {isMobile ? (
    <>
      <IconButton onClick={() => setMenuOpen(!menuOpen)} className='nav-icon' sx={{color : 'white'}}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      {menuOpen && (
        <Stack
          direction={"column"}
          gap={1}
          position="absolute"
          top={70}
          right={20}
          bgcolor="rgb(0 0 0 / 85%)"
          borderRadius={2}
          padding={2}
          zIndex={1000}
        >
          <Tooltip title="Keyboard" arrow>
            <IconButton
              sx={{
                color: "#fffa",
                "&:hover": { color: "white" },
                transition: "all 0.3s",
              }}
              onClick={() => window.location.assign("/")}
            >
              <KeyboardIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Info" arrow>
            <IconButton
              sx={{
                color: "#fffa",
                "&:hover": { color: "white" },
                transition: "all 0.3s",
              }}
              onClick={() => navigate("/info")}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Account" arrow>
            {isUser ? (
              <AccountTile username={username} />
            ) : (
              <IconButton
                sx={{
                color: "#fffa",
                "&:hover": { color: "white" },
                transition: "all 0.3s",
              }}
                onClick={() => navigate("/login")}
              >
                <Person2OutlinedIcon />
              </IconButton>
            )}
          </Tooltip>
        </Stack>
      )}
    </>
  ) : (
    // Desktop view
    <Stack direction={"row"} gap={2} alignItems={"center"}>
      <Tooltip title="Keyboard" arrow>
        <IconButton
          sx={{
                color: "#fffa",
                "&:hover": { color: "white" },
                transition: "all 0.3s",
              }}
          onClick={() => window.location.assign("/")}
        >
          <KeyboardIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Info" arrow>
        <IconButton
          sx={{
                color: "#fffa",
                "&:hover": { color: "white" },
                transition: "all 0.3s",
              }}
          onClick={() => navigate("/info")}
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Account" arrow>
        {isUser ? (
          <AccountTile username={username}  />
        ) : (
          <IconButton
            onClick={() => navigate("/login")}
            sx={{
                color: "#fffa",
                "&:hover": { color: "white" },
                transition: "all 0.3s",
              }}
          >
            <Person2OutlinedIcon />
          </IconButton>
        )}
      </Tooltip>
    </Stack>
  )}
</Stack>

    </>
  );
}

export default Navbar;

function AccountTile(props) {
  const { username } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleLogout = () => {
    // route to main page and logout the user
    // delete the token from localstorage

    if (window) {
      dispatch(logoutUser())
      window.localStorage.removeItem("token"); 
      window.localStorage.removeItem("username")
    }
    window.location.assign('/')

  }

  return (
    <>
      <div
        className="account-tile"
        onClick={() => {
          console.log("Please show dashboard!");
          navigate('/dashboard')
        }}
      >
        <Person2OutlinedIcon /> <span className="account-username">{username}</span>
      </div>
      <Logout className='logout-icon' onClick={handleLogout} />
    </>
  );
}
