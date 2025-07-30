import React, { useEffect, useState } from 'react';
import {Box, IconButton, MenuItem, Select, Stack, Tooltip, useMediaQuery} from "@mui/material"
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import logo from '../../img/typeitLogo.png'
import { useNavigate } from 'react-router-dom';

import './navbar.css'
import { Logout } from '@mui/icons-material';

function Navbar() {
    const navigate = useNavigate();

    // check if the user is already logged in 
  const [isUser, setUser] = useState(false);
  const [username, setUsername] = useState("");
  const isMobile = useMediaQuery("(max-width:768px)");
const [menuOpen, setMenuOpen] = useState(false);


    useEffect(() => {
        const token = window.localStorage.token;

        if (token) {
          setUsername(window.localStorage.username);
            setUser(true);
        }
    }, [])

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
      <IconButton onClick={() => setMenuOpen(!menuOpen)} className='nav-icon'>
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
              <AccountTile setUser={setUser} username={username} setUsername={setUsername} />
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
          <AccountTile setUser={setUser} username={username} setUsername={setUsername} />
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
  const { setUser, username, setUsername } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    // route to main page and logout the user
    // delete the token from localstorage
    if (window) {
      window.localStorage.removeItem("token"); 
      window.localStorage.removeItem("username")
      setUsername("")
      setUser(false);
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
