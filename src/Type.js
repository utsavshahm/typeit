import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import {generate} from 'random-words'
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import Controls from './Controls';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { speedGraphType } from './redux/speedAndGraph_redux/speedGraphType';
import { testTimeType } from './redux/testTime_redux/testTimeType';


function Type() {
  
  const {time} = useSelector(state=>state.testTime)

  const [currentWordIndex, setcurrentWordIndex] = useState(0);
  const [currentWordLetterIndex, setcurrentWordLetterIndex] = useState(0);
  const textRef = useRef(null);
  const [charactersTotal, updateTypedCharacters] = useState(0);
  const [correctlyTyped, updateCorrectlyTyped] = useState(0);

  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(0);

  const [speedAtTime, updateSpeedAtTime] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const generateWords = () =>{
    const generateWords = generate(100);
    const words = generateWords.map((elem)=>{
      return elem.toLowerCase();
    })
    
    return words.join(' ');
  }
  const word = generate(100);
  const wordArray = word.map((elem)=>{
      return elem.toLowerCase();
  })
  const [text, setText] = useState(wordArray.join(' '));

    useEffect(() => {
      const textElement = textRef.current;
      
      if (textElement !== null) {

        const textArray = textElement.innerText.split(' ');

        function changeColor (typed, back, reset){
          const updated = textArray.map((word, wordIndex) => {
            
            return word.split('').map((letter, letterIndex) => {
              const correctLetter = wordIndex === currentWordIndex && letterIndex === currentWordLetterIndex;
              
              const currentSpanId = `${'span-'+wordIndex+'-'+letterIndex}`
              const currentSpan = document.getElementById(currentSpanId);
              const currentSpanColor = currentSpan ? window.getComputedStyle(currentSpan).color : null;
    
              let finalColor = 'white';

              if(reset){
                return `<span style="color : white" id=${currentSpanId}>${letter}</span>`;
              }

              if (correctLetter){
                finalColor = typed===true && !back ? "orange" : (back ? "white" : "red");
              }
              else{
                finalColor = currentSpanColor;
              }
    
              return `<span style="color : ${finalColor}" id=${currentSpanId}>${letter}</span>`;
            });
          });
          
          textElement.innerHTML = updated.map((word) => word.join('')).join(' ');
        }

        function moveCursor(ch, fwd){
          const updated = textArray.map((word, wordIndex) => {
            
            return word.split('').map((letter, letterIndex) => {
              
              let currword = currentWordIndex, currletter = currentWordLetterIndex+1;
              if(ch===' '){
                currword = currentWordIndex+1;
                currletter = 0;
              }

              if(fwd==false){
                currletter = currletter - 1;
              }
              const currentLetter = wordIndex == currword && letterIndex == currletter;

              const currentSpanId = `${'span-'+wordIndex+'-'+letterIndex}`
              const currentSpan = document.getElementById(currentSpanId);
              const currentSpanColor = currentSpan ? window.getComputedStyle(currentSpan).color : null;

              const decoration = currentLetter ? 'underline' : 'none';
              return `<span style= "text-decoration : ${decoration}; color : ${currentSpanColor}" id=${currentSpanId}>${letter}</span>`;
            });
          });
          
          textElement.innerHTML = updated.map((word) => word.join('')).join(' ');
        }

        if(isRunning==false){
          changeColor(false, false, true);
          setcurrentWordIndex(0);
          setcurrentWordLetterIndex(0);
        }
  
        const handleKeyDown = (e) => {
          if (e.shiftKey || e.altKey || e.ctrlKey) {
            e.preventDefault();
            // console.log("press correct key");
            return;
          }


  
          if (e.key === textArray[currentWordIndex][currentWordLetterIndex]) {

            changeColor(true, false, false);

            setcurrentWordLetterIndex((prevIndex) => prevIndex + 1);
            moveCursor(e.key);
            updateCorrectlyTyped((prevIndex)=>prevIndex+1);
            // console.log("correct key pressed", currentWordLetterIndex, e.key);

          } else if (e.key === ' ') {
            e.preventDefault();

            if(currentWordLetterIndex>0){

              setcurrentWordIndex((prevIndex) => prevIndex + 1);
              setcurrentWordLetterIndex(0); // Reset letter index when moving to the next word
              moveCursor(e.key, true);
              
            }
          }
          else if(e.key === "Backspace"){

            e.preventDefault();
            handleBackspace();
            updateCorrectlyTyped((prevIndex)=>prevIndex+1);
            moveCursor(e.key, false);

          }
          else {

            changeColor(false, false, false);

            setcurrentWordLetterIndex((prevIndex) => prevIndex + 1);
            moveCursor(e.key, true);
            // console.log("wrong word typed", currentWordLetterIndex);
            
            
          }

          updateTypedCharacters((prevTotal)=>prevTotal+1);
        };
        const handleBackspace = () => {

          if (currentWordLetterIndex >= 0) {
            setcurrentWordLetterIndex((prevIndex) => prevIndex - 1);
          } 

          changeColor(false, true);
          moveCursor("Backspace", false);
          console.log("backspace ", currentWordLetterIndex);
        };
        
        document.addEventListener('keydown', handleKeyDown);
        
        const handleKeyUp = (e) => {
          if (e.key === "Backspace") {
            handleBackspace();
            setcurrentWordLetterIndex((prevIndex)=>prevIndex+1);
            // moveCursor(e.key, true);
            console.log("up",currentWordLetterIndex);
          }
        };

        document.addEventListener("keyup", handleKeyUp);

  
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('keyup', handleKeyUp);

        };
      }
    }, [currentWordIndex, currentWordLetterIndex, isRunning]);


    useEffect(() => {
      let intervalId;
  
      if (isRunning && seconds>0) {
        intervalId = setInterval(() => {
          setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
        }, 1000);
      }
      else if(seconds===0){
        setIsRunning(false);
        clearInterval(intervalId);
        calcTypeSpeed();
        speedAtTime.push(speed);
        updateSpeedAtTime(speedAtTime);

        dispatch({type : speedGraphType, payload : {
          speed:speed,
          speedArray:speedAtTime,
          testTime : time
        }})
        updateSpeedAtTime([]);
        setSpeed(0);
        dispatch({type : testTimeType, payload : {time : 60}})
        console.log(seconds)
        navigate('/result')
        return;
      }

      if(seconds%2==0){
        calcTypeSpeed();
        speedAtTime.push(speed);
        updateSpeedAtTime(speedAtTime);
        console.log("hy", seconds, speedAtTime)
      }

      return () => {
        clearInterval(intervalId);
      };
    }, [isRunning, seconds]);

    useEffect(()=>{
      setSeconds(time);
      setIsRunning(false);
    }, [time])

    const startTime = () =>{
      if(seconds!=time){
        const renewText = generateWords();
        setText(renewText);
      }

      setSeconds(time);
      setcurrentWordIndex(0);
      setcurrentWordLetterIndex(0);
      updateTypedCharacters(0);
      updateCorrectlyTyped(0);
      updateSpeedAtTime([])
      setSpeed(0);

      setIsRunning(true);
    }

    const calcTypeSpeed = () =>{
      const tSpeed = (correctlyTyped/5)*(60/time);
      setSpeed(tSpeed);
      return;
    }

  return (
    <>
            <Navbar/>
            <Controls/>

        <Stack justifyContent={'center'} alignItems={'center'} mt={10}>

            <Box width={"75vw"} justifyContent={'center'} alignItems={'center'} display={'flex'} lineHeight={1.8} fontSize={18} sx={{wordSpacing:5, letterSpacing:5}} textAlign={'justify'}>
                <p id='typeText' ref={textRef}>{text}</p>

                {/* <h1 id='typespeed'>0</h1><br /> */}


            </Box>

            <Stack direction={'row'} gap={3} fontSize={14} mt={5}>
              <Button onClick={startTime} variant='contained' sx={{backgroundColor:'aliceblue', color:'black', borderRadius:'15px', 
              fontSize:'18px', '&:hover':{backgroundColor:'aliceblue'}}}>Start Test</Button>
              <h1 id='currentTime'>Time : <Typography variant='p' sx={{color:'orange'}}>{seconds}</Typography></h1>
              <h1 id='charactersTyped'>Total Characters : <Typography variant='p' sx={{color:'orange'}}>{charactersTotal}</Typography></h1>
              <h1 id='speed'>Speed : <Typography variant='p' sx={{color:'orange'}}>{speed}</Typography></h1>
            </Stack>

        </Stack>

    </>
  );
}

export default Type;
