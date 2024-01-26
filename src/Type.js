import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import {generate} from 'random-words'

function Type() {
  
  const [currentWordIndex, setcurrentWordIndex] = useState(0);
  const [currentWordLetterIndex, setcurrentWordLetterIndex] = useState(0);
  const textRef = useRef(null);
  const [charactersTotal, updateTypedCharacters] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(0);


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
            // console.log("correct key pressed", currentWordLetterIndex, e.key);

          } else if (e.key === ' ') {
            e.preventDefault();

            setcurrentWordIndex((prevIndex) => prevIndex + 1);
            setcurrentWordLetterIndex(0); // Reset letter index when moving to the next word
            moveCursor(e.key, true);
            
          }
          else if(e.key === "Backspace"){

            e.preventDefault();
            handleBackspace();
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
        return;
      }
      return () => {
        clearInterval(intervalId);
      };
    }, [isRunning, seconds]);

    const startTime = () =>{

      if(seconds!=60){
        const renewText = generateWords();
        setText(renewText);
      }

      setSeconds(60);
      setcurrentWordIndex(0);
      setcurrentWordLetterIndex(0);
      updateTypedCharacters(0);
      setSpeed(0);

      setIsRunning(true);
    }

    const calcTypeSpeed = () =>{
      const tSpeed = charactersTotal/5;
      setSpeed(tSpeed);
      return;
    }

  return (
    <>

        <Stack justifyContent={'center'} alignItems={'center'} mt={10}>

            <Box width={"75vw"} justifyContent={'center'} alignItems={'center'} display={'flex'} lineHeight={1.8} fontSize={18} sx={{wordSpacing:5, letterSpacing:5}} textAlign={'justify'}>
                <p id='typeText' ref={textRef}>{text}</p>

                {/* <h1 id='typespeed'>0</h1><br /> */}


            </Box>

            <Stack direction={'row'} gap={3} fontSize={14} mt={5}>
              <Button onClick={startTime} variant='contained'>Start Test</Button>
              <h1 id='currentTime'>Time : <Typography variant='p' sx={{color:'cyan'}}>{seconds}</Typography></h1>
              <h1 id='charactersTyped'>Total Characters : <Typography variant='p' sx={{color:'cyan'}}>{charactersTotal}</Typography></h1>
              <h1 id='speed'>Speed : <Typography variant='p' sx={{color:'cyan'}}>{speed}</Typography></h1>
            </Stack>

        </Stack>

    </>
  );
}

export default Type;
