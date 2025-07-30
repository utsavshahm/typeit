import { Box, IconButton, Stack, Button, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { testTimeType } from "../../redux/testTime_redux/testTimeType";
import { punctuationType } from "../../redux/testTime_redux/punctuationType";
import "./controls.css";

function Controls() {
  const dispatch = useDispatch();
  const [activeTimeIndex, setActiveTimeIndex] = useState(2);
  const [punctuation, setPunctuation] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const durations = [15, 30, 60, 120];

  const handleButtonClick = (index, duration) => {
    setActiveTimeIndex(index);
    dispatch({ type: testTimeType, payload: { time: duration } });
  };

  const controlHandler = () => {
    setPunctuation((prev) => {
      const newState = !prev;
      dispatch({ type: punctuationType, payload: { punctuation: newState } });
      return newState;
    });
  };

  const renderControls = () => (
    <Stack
      direction={"row"}
      width={isSmallScreen ? "90vw" : "min(500px, 80vw)"}
      minWidth={isSmallScreen ? "unset" : "320px"}
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

      <Box height={20} width={2} sx={{ backgroundColor: "white" }}></Box>

      <Stack direction={"row"} justifyContent={"space-around"} gap={1}>
        {durations.map((duration, index) => (
          <IconButton
            key={index}
            onClick={() => handleButtonClick(index, duration)}
            sx={{
              color: activeTimeIndex === index ? "orange" : "#fffa",
              fontSize: "15px",
              transition: "all 0.3s",
            }}
          >
            {duration}
          </IconButton>
        ))}
      </Stack>
    </Stack>
  );

  return (
    <>
      <Stack direction="column" alignItems="center" padding="10px 0">
        {isSmallScreen ? (
          <>
          <Button
            onClick={() => setShowSettings(!showSettings)}
            sx={{
              textTransform: "none",
              mb: 1,
              bgcolor: "rgb(0 0 0 / 34%)",
              color: "#ccc",
              borderRadius: "10px",
              padding: "6px 16px",
              fontSize: "0.875rem",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgb(0 0 0 / 50%)",
                color: "orange",
              },
            }}
          >
            {showSettings ? "Hide Settings" : "Show Settings"}
          </Button>
            {showSettings && renderControls()}
          </>
        ) : (
          renderControls()
        )}
      </Stack>
    </>
  );
}

export default Controls;
