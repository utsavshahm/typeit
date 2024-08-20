import { Box, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { testTimeType } from "../../redux/testTime_redux/testTimeType";
import { punctuationType } from "../../redux/testTime_redux/punctuationType";

import "./controls.css";

function Controls() {
  // const [time, setTime] = useState(60);
  const dispatch = useDispatch();

  const [activeTimeIndex, setActiveTimeIndex] = useState(2);

  const handleButtonClick = (index, duration) => {
    setActiveTimeIndex(index);
    // setTime(duration);
    dispatch({ type: testTimeType, payload: { time: duration } });
    console.log("helo");
  };
  const durations = [15, 30, 60, 120];

  const [punctuation, setPunctuation] = useState(false);

  const controlHandler = () => {
    console.log("Punctuation clicked!");

    if (punctuation) {
      setPunctuation(false);
      dispatch({ type: punctuationType, payload: { punctuation: false } });

    } else {
      setPunctuation(true);
      dispatch({ type: punctuationType, payload: { punctuation: true } });

    }
  };
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100vw"}
        padding={"10px 0"}
      >
        <Stack
          direction={"row"}
          width={"30vw"}
          height={50}
          alignItems={"center"}
          bgcolor={"rgb(0 0 0 / 34%)"}
          borderRadius={10}
          justifyContent={"space-evenly"}
        >
          <Stack direction={"row"} gap={1}>
            <span
              className="controls punc"
              onClick={controlHandler}
              style={{ color: punctuation ? "orange" : "#ccc" }}
            >
              @ punctuation
            </span>
          </Stack>

          {/* <Box height={20} width={2} sx={{backgroundColor:'white'}}></Box> */}

          {/* <Stack direction={'row'} justifyContent={'space-evenly'} gap={2}>
                    <Button startIcon={<AccessTimeFilledIcon/>} sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}} >time</Button>
                    <Button startIcon={<AbcIcon/>} sx={{color:"#fffa", "&:hover": { color: "white" },  transition:"all 0.3s", fontSize:"15px"}}>words</Button>
                </Stack> */}

          <Box height={20} width={2} sx={{ backgroundColor: "white" }}></Box>

          <Stack direction={"row"} justifyContent={"space-around"} gap={1}>
            {durations.map((duration, index) => (
              <IconButton
                key={index}
                onClick={() => handleButtonClick(index, duration)}
                sx={{
                  color: activeTimeIndex === index ? "orange" : "#fffa", // Change color based on activeButtonIndex
                  fontSize: "15px",
                  transition: "all 0.3s",
                }}
              >
                {duration}
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default Controls;
