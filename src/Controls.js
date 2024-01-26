import { Box, Button, IconButton, Stack } from '@mui/material';
import AbcIcon from '@mui/icons-material/Abc';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ConstructionIcon from '@mui/icons-material/Construction';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import TagIcon from '@mui/icons-material/Tag';
import React from 'react';
import FormatQuote from '@mui/icons-material/FormatQuote';

function Controls() {
  return (
    <>
        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} width={"100vw"} padding={"10px 0"}>

            <Stack direction={'row'} width={"55vw"} height={50} alignItems={'center'} bgcolor={'rgb(0 0 0 / 34%)'} borderRadius={10} justifyContent={'space-evenly'}>

                <Stack direction={'row'}>
                    <Button sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>@ punctuation</Button>
                    <Button startIcon={<TagIcon/>} sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>numbers</Button>
                </Stack>

                <Box height={20} width={2} sx={{backgroundColor:'white'}}></Box>

                <Stack direction={'row'} justifyContent={'space-around'}>
                    <Button startIcon={<AccessTimeFilledIcon/>} sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>time</Button>
                    <Button startIcon={<AbcIcon/>} sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>words</Button>
                    <Button startIcon={<FormatQuote/>} sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>quote</Button>
                    <Button startIcon={<SelfImprovementIcon/>} sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>zen</Button>
                    <Button startIcon={<ConstructionIcon/>} sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>custom</Button>

                </Stack>

                <Box height={20} width={2} sx={{backgroundColor:'white'}}></Box>

                <Stack direction={'row'} justifyContent={'space-around'}>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>15</IconButton>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>30</IconButton>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>60</IconButton>
                    <IconButton sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>120</IconButton>
                </Stack>


            </Stack>
        </Stack>
    
    </>
  );
}

export default Controls;
