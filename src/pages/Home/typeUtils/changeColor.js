function changeColor(
  typed,
  back,
  reset,
  textRef,
  currentWordIndex,
  currentWordLetterIndex
) {

  if (textRef !== null) {
    
    const textElement = textRef?.current;
    const textArray = textElement?.innerText?.split(" ");
    const updated = textArray?.map((word, wordIndex) => {
      return word.split("").map((letter, letterIndex) => {
        const correctLetter =
          wordIndex === currentWordIndex &&
          letterIndex === currentWordLetterIndex;
  
        const currentSpanId = `${"span-" + wordIndex + "-" + letterIndex}`;
        const currentSpan = document.getElementById(currentSpanId);
        const currentSpanColor = currentSpan
          ? window.getComputedStyle(currentSpan).color
          : null;
  
        let finalColor = "white";
  
        if (reset) {
          return `<span style="color : white" id=${currentSpanId}>${letter}</span>`;
        }
  
        if (correctLetter) {
          finalColor =
            typed === true && !back ? "orange" : back ? "white" : "red";
        } else {
          finalColor = currentSpanColor;
        }
  
        return `<span style="color : ${finalColor}" id=${currentSpanId}>${letter}</span>`;
      });
    });
    textElement.innerHTML = updated?.map((word) => word.join("")).join(" ");


  }
}

export default changeColor;
