import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import AbcIcon from '@mui/icons-material/Abc';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ConstructionIcon from '@mui/icons-material/Construction';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import React from 'react';

function Controls() {
  return (
    <>
        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} width={"100vw"} padding={"10px 0"}>

            <Stack direction={'row'} width={"50vw"} height={50} alignItems={'center'} bgcolor={'rgb(0 0 0 / 34%)'} borderRadius={10} justifyContent={'space-evenly'}>

                <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'space-evenly'}>

                    <Button variant='text' sx={{color:"#fffa", "&:hover":{color:'white', backgroundColor:'transparent'}, fontSize:15}}>@ punctuation</Button>
                    <Button variant='text' sx={{color:"#fffa", "&:hover":{color:'white' , backgroundColor:'transparent'}, fontSize:15}}># numbers</Button>

                </Stack>
                


                <Box height={35} width={'2px'} sx={{backgroundColor:'#fffa'}}></Box>

                <Stack direction={'row'} gap={0.7}>
                    <Button startIcon={<AccessTimeFilledIcon/>} sx={{color:"#fffa", "&:hover":{color:'white', backgroundColor:'transparent'}, fontSize:15}}>
                        time
                    </Button>
                    <Button startIcon={<AbcIcon/>} sx={{color:"#fffa", "&:hover":{color:'white', backgroundColor:'transparent'}, fontSize:15}}>
                        words
                    </Button>
                    <Button startIcon={<SelfImprovementIcon/>} sx={{color:"#fffa", "&:hover":{color:'white', backgroundColor:'transparent'}, fontSize:15}}>
                        zen
                    </Button>
                    <Button startIcon={<ConstructionIcon/>} sx={{color:"#fffa", "&:hover":{color:'white', backgroundColor:'transparent'}, fontSize:15}}>
                        custom
                    </Button>

                </Stack>

                <Box height={35} width={'2px'} sx={{backgroundColor:'#fffb'}}></Box>

                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'} width={'inherit'}>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>
                        15
                    </IconButton>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>
                        30
                    </IconButton>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>
                        60
                    </IconButton>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>
                        120
                    </IconButton>
                </Stack>

            </Stack>
        </Stack>
    
    </>
  );
}

export default Controls;
