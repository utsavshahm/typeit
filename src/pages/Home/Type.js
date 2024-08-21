import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import Controls from "../../components/Controls/Controls.js";
import { speedGraphType } from "../../redux/speedAndGraph_redux/speedGraphType";
import { useKeyHandlers } from "../../hooks/useKeyHandlers.js";
import "./styles.css";
import moveCursor from "./typeUtils/moveCursor.js";

import { generateWords, generateWordsWithPunctuation } from "../../utils/words.js";
import axios from "axios";

function Type(props) {

  const { time } = useSelector((state) => state.testTime) || 60;
  const { punctuation } = useSelector((state) => state.punctuationType) || false;

  const textRef = useRef(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWordLetterIndex, setCurrentWordLetterIndex] = useState(0);
  const [charactersTotal, updateTypedCharacters] = useState(0);
  const [correctlyTyped, updateCorrectlyTyped] = useState(0);
  const [incorrectLetters, setIncorrectLetters] = useState(new Map()); 
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [speedAtTime, updateSpeedAtTime] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let word = punctuation ? generateWordsWithPunctuation() : generateWords();

  // console.log(time, punctuation)


  const [text, setText] = useState(word.join(" "));

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
  const startTime = () => {
    let check = false;
    if (seconds !== time) {
      check = true;
      const renewText = generateText(punctuation);
      setText(renewText);
    }

    setSeconds(time);
    console.log(charactersTotal)
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
    const tSpeed = (((correctlyTyped - incorrectLetters.size) / 5) * (60 / currTime)).toFixed(2);
    setSpeed(Math.max(tSpeed, 0));
  }



  const calcAccuracy = () => {
    const accuracy = (((correctlyTyped * 1.0) / (correctlyTyped + incorrectLetters.size)) * 100).toFixed(2);

    return accuracy;
  }

  // const calcTypeSpeed = useCallback((currTime) => {
  //   const tSpeed = (((correctlyTyped - incorrectLetters.size) / 5) * (60 / currTime)).toFixed(2);
  //   setSpeed(Math.max(tSpeed, 0));
  // }, [correctlyTyped, incorrectLetters.size]);



  // const calcAccuracy = useCallback(() => {
  //   const accuracy = (((correctlyTyped * 1.0) / (correctlyTyped + incorrectLetters.size)) * 100).toFixed(2);

  //   return accuracy;
  // }, [correctlyTyped, incorrectLetters.size])
  const generateText = (punc) => {
    let f;
    if (punc) {
      f = generateWordsWithPunctuation;
    }
    else {
      f = generateWords;
    }
    const wordArray = f();
    return wordArray.join(" ");
  };



  // send data to backend

  const submitTestData = async (data) => {
    try {


      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/test`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      if (response.data.status === false) {
        console.log()
      }

    } catch (error) {
      console.log(error)
    }
  }
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
      
      let acc = calcAccuracy();
      dispatch({
        type: speedGraphType,
        payload: {
          speed: speed,
          speedArray: speedAtTime,
          testTime: time,
          accuracy : acc
        },
      });

      updateSpeedAtTime([]);
      setSpeed(0);
      
      localStorage.setItem("testTaken", "True")
      

      // submit data to backend

      if (localStorage.getItem("token")) {
        const date = new Date();

        const testData = {
          date : date,
          testType: "time" + (punctuation ? ` punctuation` : ''),
          testTime: time,
          wpm: speed, 
          accuracy : acc,
        }
        const data = {
          testData: testData
        }
        submitTestData(data)
      }

      navigate('/result')
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
    setIsRunning(false);

    const renewText = generateText(punctuation);
    setText(renewText);

    setSeconds(time);
  }, [punctuation, time])

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

            <Stack direction={"row"} gap={3} fontSize={14} mt={10}>
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
              {/* <h1 id="charactersTyped">
                Total Characters :{" "}
                <Typography variant="p" sx={{ color: "orange" }}>
                  {charactersTotal}
                </Typography>
              </h1> */}
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
