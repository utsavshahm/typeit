import { Box, Button, Stack, Typography, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { generate } from "random-words";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Controls from "../../components/Controls";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { speedGraphType } from "../../redux/speedAndGraph_redux/speedGraphType";
import { testTimeType } from "../../redux/testTime_redux/testTimeType";

import "./styles.css";
import changeColor from "./typeUtils/changeColor.js";
import moveCursor from "./typeUtils/moveCursor.js";
import { useKeyHandlers } from "../../hooks/useKeyHandlers.js";

function Type() {
  const { time } = useSelector((state) => state.testTime);
  const textRef = useRef(null);
  const [currentWordIndex, setcurrentWordIndex] = useState(0);
  const [currentWordLetterIndex, setcurrentWordLetterIndex] = useState(0);
  const [charactersTotal, updateTypedCharacters] = useState(0);
  const [correctlyTyped, updateCorrectlyTyped] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [speedAtTime, updateSpeedAtTime] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const word = generate(100);
  const wordArray = word.map((elem) => elem.toLowerCase());
  const [text, setText] = useState(wordArray.join(" "));

  useKeyHandlers(
    textRef,
    currentWordIndex,
    currentWordLetterIndex,
    isRunning,
    updateTypedCharacters,
    updateCorrectlyTyped, 
    setcurrentWordIndex, 
    setcurrentWordLetterIndex
  );

  useEffect(() => {
    let intervalId;

    if (isRunning && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      }, 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
      clearInterval(intervalId);
      calcTypeSpeed();
      speedAtTime.push(speed);
      updateSpeedAtTime(speedAtTime);

      dispatch({
        type: speedGraphType,
        payload: {
          speed: speed,
          speedArray: speedAtTime,
          testTime: time,
        },
      });
      updateSpeedAtTime([]);
      setSpeed(0);
      dispatch({ type: testTimeType, payload: { time: 60 } });
      console.log(seconds);
      navigate("/result");
      return;
    }

    if (seconds % 2 == 0) {
      calcTypeSpeed();
      speedAtTime.push(speed);
      updateSpeedAtTime(speedAtTime);
      console.log("hy", seconds, speedAtTime);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, seconds]);

  useEffect(() => {
    setSeconds(time);
    setIsRunning(false);
  }, [time]);

  const startTime = () => {
    if (seconds != time) {
      const renewText = generateWords();
      setText(renewText);
    }

    setSeconds(time);
    setcurrentWordIndex(0);
    setcurrentWordLetterIndex(0);
    moveCursor("", false, true, textRef, 0, 0);
    updateTypedCharacters(0);
    updateCorrectlyTyped(0);
    updateSpeedAtTime([]);
    setSpeed(0);

    setIsRunning(true);
  };

  const calcTypeSpeed = () => {
    const tSpeed = (correctlyTyped / 5) * (60 / time);
    setSpeed(tSpeed);
    return;
  };

  const generateWords = () => {
    const generateWords = generate(100);
    const words = generateWords.map((elem) => elem.toLowerCase());
    return words.join(" ");
  };
  
  useEffect(() => {
    if (textRef.current) {
      const lineHeight = 45; 
      const currentLine = Math.floor(currentWordIndex / 18); 
      textRef.current.style.transform = `translateY(-${
        currentLine * lineHeight}px)`;
    }
  }, [currentWordIndex]);

  return (
    <>
      <Navbar />
      <Controls />

      <div className="caps-container">
        <div className="caps-on" id="caps">
          Caps Lock
        </div>
      </div>

      <Stack justifyContent={"center"} alignItems={"center"} mt={10}>
        <Box
          className="text-container"
        >
          <p id="typeText" ref={textRef}>
            {text}
          </p>

          {/* <h1 id='typespeed'>0</h1><br /> */}
        </Box>

        <Stack direction={"row"} gap={3} fontSize={14} mt={5}>
          <Button
            onClick={startTime}
            variant="contained"
            sx={{
              backgroundColor: "aliceblue",
              color: "black",
              borderRadius: "15px",
              fontSize: "18px",
              "&:hover": { backgroundColor: "aliceblue" },
            }}
          >
            Start Test
          </Button>
          <h1 id="currentTime">
            Time :{" "}
            <Typography variant="p" sx={{ color: "orange" }}>
              {seconds}
            </Typography>
          </h1>
          <h1 id="charactersTyped">
            Total Characters :{" "}
            <Typography variant="p" sx={{ color: "orange" }}>
              {charactersTotal}
            </Typography>
          </h1>
          <h1 id="speed">
            Speed :{" "}
            <Typography variant="p" sx={{ color: "orange" }}>
              {speed}
            </Typography>
          </h1>
        </Stack>
      </Stack>
    </>
  );
}

export default Type;
