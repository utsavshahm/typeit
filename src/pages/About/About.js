import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./about.css";

const About = () => {
  const text = [
    <>
      Welcome to our dynamic typing platform! Hi, I'm Utsav Shah, a passionate
      web developer, and creator of this amazing website. You can find more
      about myself through my portfolio:
      <Link
        to="https://utsavshah.vercel.app"
        target="_blank"
        className="link-portfolio"
      >
        Utsav Shah
      </Link>
      .
    </>,

    "Explore our diverse typing modes, including timed settings. Test your speed and accuracy against the clock.",

    "One of the highlights of our platform is our interactive results feature. Receive instant feedback on your typing performance, including detailed statistics. Track your progress over time and celebrate your successes as you reach new milestones.",

    "Join our growing community of typing enthusiasts and discover the possibilities with us. Let's type smarter, faster, and better together!",
  ];
  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        sx={{ overflowX: "hidden" }}
      >
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">


        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          >
          <Stack direction={"column"} gap={4} width={"70vw"}>
            <Typography variant="h3" fontWeight={700} color={"orange"}>
              {" "}
              About Us{" "}
            </Typography>
            {text.map((item, index) => {
              return (
                <Typography variant="p" fontSize={20} key={index}>
                  {" "}
                  {item}
                </Typography>
              );
            })}
          </Stack>
        </Stack>
      </Box>
      </Box>
    </div>
  );
};

export default About;
