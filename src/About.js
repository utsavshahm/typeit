import React from 'react';
import Navbar from './Navbar'; 
import { Box, Stack, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';


const About = () => {

  return (
    <div>
        <Navbar/>
        <Stack direction={'column'} justifyContent={'center'} alignItems={'center'}>
            <Stack direction={'column'} gap={4} width={"70vw"}  alignItems={'center'} textAlign={'justify'}>
                <Typography variant='h3' fontWeight={700} color={'orange'}> About Us </Typography>
                <Typography variant='p' fontSize={20} >
                    Welcome to our dynamic typing platform! We're passionate about revolutionizing the way individuals approach typing practice. Our website offers a range of innovative features designed to enhance your typing experience and accelerate your progress.
                </Typography>
                <Typography variant='p' fontSize={20} >
                    With our customizable themes, you can personalize your typing environment to suit your mood and preferences. Whether you prefer a sleek and modern design or something more playful and colorful, we've got a theme for you.
                </Typography>
                <Typography variant='p' fontSize={20} >
                    Explore our diverse typing modes, including timed settings and interactive challenges. Test your speed and accuracy against the clock, or engage in interactive exercises that keep you motivated and focused.
                </Typography>
                <Typography variant='p' fontSize={20} >
                    One of the highlights of our platform is our interactive results feature. Receive instant feedback on your typing performance, including detailed statistics and insights to help you identify areas for improvement. Track your progress over time and celebrate your successes as you reach new milestones.
                </Typography>
                <Typography variant='p' fontSize={20} >
                    Join our growing community of typing enthusiasts and discover the possibilities with us. Whether you're a beginner or a seasoned typist, there's always something new to explore and learn on our website. Let's type smarter, faster, and better together!
                </Typography>
            </Stack>
        </Stack>

    </div>
  );
}

export default About;

{/* <Stack justifyContent={'center'} alignItems={'center'} direction={'column'}>

<Stack width={"65vw"} border={"2px solid red"} >
    <Stack direction={'row'} justifyContent={'center'}>
        <Typography variant='h3' fontWeight={700}>About Us</Typography>
    </Stack>
    <Stack direction={'column'} justifyContent={'center'} textAlign={'justify'}>
        <Typography variant='p' fontSize={"20px"} sx={{wordSpacing:6}} mt={2}>Welcome to our dynamic typing platform! We're passionate about revolutionizing the way individuals approach typing practice. Our website offers a range of innovative features designed to enhance your typing experience and accelerate your progress.</Typography>

        <Typography variant='p' fontSize={"20px"} sx={{wordSpacing:6}} mt={2}>With our customizable themes, you can personalize your typing environment to suit your mood and preferences. Whether you prefer a sleek and modern design or something more playful and colorful, we've got a theme for you.</Typography>

        <Typography variant='p' fontSize={"20px"} sx={{wordSpacing:6}} mt={2}>
        Explore our diverse typing modes, including timed settings and interactive challenges. Test your speed and accuracy against the clock, or engage in interactive exercises that keep you motivated and focused.
        </Typography>
        <Typography variant='p' fontSize={"20px"} sx={{wordSpacing:6}} mt={2}>
        One of the highlights of our platform is our interactive results feature. Receive instant feedback on your typing performance, including detailed statistics and insights to help you identify areas for improvement. Track your progress over time and celebrate your successes as you reach new milestones.
        </Typography>
        <Typography variant='p' fontSize={"20px"} sx={{wordSpacing:6}} mt={2}>

        At our core, we believe in the power of technology to transform learning and skill development. We're committed to providing a dynamic and engaging platform that empowers individuals to become more confident and proficient typists.
        </Typography>
        <Typography variant='p' fontSize={"20px"} sx={{wordSpacing:6}} mt={2}>


        Join our growing community of typing enthusiasts and discover the possibilities with us. Whether you're a beginner or a seasoned typist, there's always something new to explore and learn on our website. Let's type smarter, faster, and better together!
        </Typography>




    </Stack>
</Stack>
</Stack> */}