import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import { generate } from "random-words";
import Controls from "../../components/Controls/Controls.js";
import Navbar from "../../components/Navbar/Navbar.js";
import { speedGraphType } from "../../redux/speedAndGraph_redux/speedGraphType";
import { testTimeType } from "../../redux/testTime_redux/testTimeType";
import { useKeyHandlers } from "../../hooks/useKeyHandlers.js";
import Result from "../Result/Result.js";
import "./styles.css";
import changeColor from "./typeUtils/changeColor.js";
import moveCursor from "./typeUtils/moveCursor.js";

import { generateWords } from "../../utils/words.js";

function Type(props) {
  const { isFinish } = props;

  const { time } = useSelector((state) => state.testTime) || 60;
  const textRef = useRef(null);
  // const cursorRef = useRef(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWordLetterIndex, setCurrentWordLetterIndex] = useState(0);
  const [charactersTotal, updateTypedCharacters] = useState(0);
  const [correctlyTyped, updateCorrectlyTyped] = useState(0);
  const [incorrectLetters, setIncorrectLetters] = useState(new Map()); 
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [speedAtTime, updateSpeedAtTime] = useState([]);

  const [isTest, setTest] = useState(false);
  const defaultResult = {
    speed: 0,
    testTime: 0,
    array: [],
  };
  const [result, setResult] = useState(defaultResult);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const word = generateWords();
  const wordArray = word.map((elem) => elem.toLowerCase());
  const [text, setText] = useState(wordArray.join(" "));
  const lineHeight = 45;

  useKeyHandlers(
    textRef,
    currentWordIndex,
    currentWordLetterIndex,
    isRunning,
    updateTypedCharacters,
    updateCorrectlyTyped,
    setCurrentWordIndex,
    setCurrentWordLetterIndex,
    incorrectLetters, 
    setIncorrectLetters
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
      calcTypeSpeed(time);
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
      dispatch({ type: testTimeType, payload: { time: 60 } });

      updateSpeedAtTime([]);
      setSpeed(0);
      // setResult({
      //   speed: speed,
      //   testTime: time,
      //   array: speedAtTime,
      // });

      isFinish(true);
      return;
    }

    if (seconds % 2 === 0) {
      calcTypeSpeed(time === seconds ? time : time - seconds);
      speedAtTime.push(speed);
      updateSpeedAtTime(speedAtTime);
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
    let check = false; 
    if (seconds !== time) {
      check = true; 
      const renewText = generateText();
      setText(renewText);  
    }

    setSeconds(time);
    setCurrentWordIndex(0);
    setCurrentWordLetterIndex(0);
    moveCursor("", false, true, textRef, 0, 0);
    updateTypedCharacters(0);
    updateCorrectlyTyped(0);
    updateSpeedAtTime([]);
    setSpeed(0);
    
    if (!check) {
      setIsRunning(true);
    }
    else {
      setIsRunning(false);
    }
  };

  const calcTypeSpeed = (currTime) => {
    console.log("incorrect ", incorrectLetters.size)
    const tSpeed = (((correctlyTyped / 5) - incorrectLetters.size) * (60 / currTime)).toFixed(2);
    setSpeed(Math.max(tSpeed, 0));
    return;
  };

  const generateText = () => {
    const wordArray = generateWords();
    const words = wordArray.map((elem) => elem.toLowerCase());
    return words.join(" ");
  };

  return (
    <>
          <Controls />

          <div className="caps-container">
            <div className="caps-on" id="caps">
              Caps Lock
            </div>
          </div>

          <Stack justifyContent={"center"} alignItems={"center"} mt={10}>
            <Box className="text-container">
                <p ref={textRef} id="typeText">{text}</p>
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
