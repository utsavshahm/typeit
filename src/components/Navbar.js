import React from 'react';
import {Box, IconButton, Stack, Tooltip} from "@mui/material"
import KeyboardIcon from '@mui/icons-material/Keyboard';
import InfoIcon from '@mui/icons-material/Info';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import logo from '../img/typeitLogo.png'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

  return (
    <>
        <Stack direction={"row"} justifyContent={'space-around'} padding={5} width={"100vw"}>
            <Stack direction={'row'} gap={2} alignItems={'center'}>
                <Box>
                    <img src={logo} alt="logo" height={60} width={200}/>
                </Box>

                <Tooltip title="Keyboard" arrow>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s"}} onClick={()=>{navigate('/')}}>
                        <KeyboardIcon/>
                    </IconButton>
                </Tooltip>

{/* 
               <Tooltip title="Leaderboard" arrow>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s"}}>
                        <EqualizerIcon/>
                    </IconButton>
                </Tooltip> */}

                <Tooltip title="Info" arrow>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s"}} onClick={()=>{navigate('/info')}}>
                        <InfoIcon/>
                    </IconButton>
                </Tooltip>

                {/* <Tooltip title="Settings" arrow>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s"}}>
                        <SettingsIcon/>
                    </IconButton>
                </Tooltip> */}

            </Stack>
            <Stack direction={'row'} gap={2} alignItems={'center'}>
{/* 
                <Tooltip title="Notification" arrow>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s"}}>
                        <NotificationsIcon/>
                    </IconButton>
                </Tooltip> */}

                <Tooltip title="Account" arrow>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s"}} onClick={()=>{navigate('/login')}}>
                        <Person2OutlinedIcon/>
                    </IconButton>
                </Tooltip>

            </Stack>
        </Stack>
    </>
  );
}

export default Navbar;
