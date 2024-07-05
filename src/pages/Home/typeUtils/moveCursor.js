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
        const textArray = textElement.innerText.split(" ");
          
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
                // Return the span for the letter and the blinking cursor if it's the current letter
                return (
                  (currentLetter ? `<span class="blinking-cursor"></span>` : "") +
                  `<span style="text-decoration: ${decoration}; color: ${currentSpanColor}" id="${currentSpanId}">${letter}</span>`
                );
              })
              .join(""); // Join the letters to avoid additional whitespace
          })
          .join(" "); // Join the words with a space
      
        textElement.innerHTML = updated;


    }
}

export default moveCursor;
