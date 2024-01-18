import React from 'react';
import {Box, IconButton, Stack, Tooltip, Typography} from "@mui/material"
import KeyboardIcon from '@mui/icons-material/Keyboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import logo from './img/typeitLogo.png'

function Navbar() {
  return (
    <>
        <Stack direction={"row"} justifyContent={'space-around'} padding={5} width={"100vw"}>
            <Stack direction={'row'} gap={2} alignItems={'center'}>
                <Box>
                    <img src={logo} alt="logo" height={60} width={200}/>
                </Box>

                <Tooltip title="Keyboard" arrow>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s"}}>
                        <KeyboardIcon/>
                    </IconButton>
                </Tooltip>


               <Tooltip title="Leaderboard" arrow>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s"}}>
                        <EqualizerIcon/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Info" arrow>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s"}}>
                        <InfoIcon/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Settings" arrow>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s"}}>
                        <SettingsIcon/>
                    </IconButton>
                </Tooltip>

            </Stack>
            <Stack direction={'row'} gap={2} alignItems={'center'}>

                <Tooltip title="Notification" arrow>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s"}}>
                        <NotificationsIcon/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Account" arrow>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s"}}>
                        <AccountCircleIcon/>
                    </IconButton>
                </Tooltip>

            </Stack>
        </Stack>
    </>
  );
}

export default Navbar;
