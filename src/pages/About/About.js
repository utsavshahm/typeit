import React from 'react';
import Navbar from '../../components/Navbar'; 
import { Stack, Typography } from '@mui/material';


const About = () => {
    const text = [
        "Welcome to our dynamic typing platform! We're passionate about revolutionizing the way individuals approach typing practice. Our website offers a range of innovative features designed to enhance your typing experience and accelerate your progress.",
        
        "With our customizable themes, you can personalize your typing environment to suit your mood and preferences. Whether you prefer a sleek and modern design or something more playful and colorful, we've got a theme for you.",
      
        "Explore our diverse typing modes, including timed settings and interactive challenges. Test your speed and accuracy against the clock, or engage in interactive exercises that keep you motivated and focused.",
      
        "One of the highlights of our platform is our interactive results feature. Receive instant feedback on your typing performance, including detailed statistics and insights to help you identify areas for improvement. Track your progress over time and celebrate your successes as you reach new milestones.",
      
        "Join our growing community of typing enthusiasts and discover the possibilities with us. Whether you're a beginner or a seasoned typist, there's always something new to explore and learn on our website. Let's type smarter, faster, and better together!",
      
    ];
  return (
    <div>
        <Navbar/>
        <Stack direction={'column'} justifyContent={'center'} alignItems={'center'}>
            <Stack direction={'column'} gap={4} width={"70vw"}  alignItems={'center'} textAlign={'justify'}>
                <Typography variant='h3' fontWeight={700} color={'orange'}> About Us </Typography>
                  {text.map((item, index) => {
                      return <Typography variant='p' fontSize={20} key={index}> {item}</Typography>
                    })}
            </Stack>
        </Stack>

    </div>
  );
}

export default About;
