let totalTranslateY = 0;

function moveCursor(
  ch,
  fwd,
  start = false,
  textRef,
  currentWordIndex,
  currentWordLetterIndex
) {

    if (textRef !== null) {
        
      const textElement = textRef.current;
      // console.log("text element, ", textElement);
        const textArray = textElement.innerText.split(" ");
      // console.log("text array, ", textArray);
          
        const updated = textArray
          .map((word, wordIndex) => {
            return word
              .split("")
              .map((letter, letterIndex) => {

                console.log("key pressed ", ch)
                let currword, currletter;
      
                if (start) {
                  currword = currentWordIndex;
                  currletter = 0;
                } else {
                  currword = currentWordIndex;
                  currletter = currentWordLetterIndex + 1;
      
                  if (ch === " ") {
                    currword = currentWordIndex + 1;
                    currletter = 0;
                  }
      
                  if (fwd === false) {
                    currletter = currletter - 1;
                  }
                }
                


                const currentLetter =
                  wordIndex === currword && letterIndex === currletter;
                const currentSpanId = `span-${wordIndex}-${letterIndex}`;
                const currentSpan = document.getElementById(currentSpanId);
                const currentSpanColor = currentSpan
                  ? window.getComputedStyle(currentSpan).color
                  : null;
      
                const decoration = currentLetter ? "underline" : "none";
                if (
                  currletter == word.length &&
                  wordIndex == currentWordIndex &&
                  letterIndex==currentWordLetterIndex
                ) {
                  return (
                    
                    `<span style="text-decoration: ${decoration}; color: ${currentSpanColor}" id="${currentSpanId}">${letter}</span>` + `<span class="blinking-cursor"></span>`
                  );
                }
                
                return (
                  (currentLetter ? `<span class="blinking-cursor"></span>` : "") +
                  `<span style="text-decoration: ${decoration}; color: ${currentSpanColor}" id="${currentSpanId}">${letter}</span>`
                );
              })
              .join("");
          })
          .join(" ");
      
      textElement.innerHTML = updated;
      
          const cursorElement = textElement.querySelector(".blinking-cursor");
          if (cursorElement) {
            const cursorTop = cursorElement.offsetTop;

            const linesDown = Math.floor(
              (cursorTop - Math.abs(totalTranslateY)) / 45
            );

            console.log("Lines down:", linesDown);

            if (linesDown >= 1) {
              totalTranslateY -= 45;
              textElement.style.transform = `translateY(${totalTranslateY}px)`;
            }
          }


    }
}

export default moveCursor;