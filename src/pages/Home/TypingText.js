import React, { useEffect, useRef } from "react";

const TypingText = ({ text, currentWordIndex, currentLetterIndex, incorrectLetters, correctLetters, translateY, setTranslateY }) => {
  const words = text.split(" ");

    const textDisplayRef = useRef(null);

    useEffect(() => {
        const textElement = textDisplayRef.current;
        if (!textElement) return;

        const cursorElement = textElement.querySelector(".cursor");
        if (!cursorElement) return;

        const cursorTop = cursorElement.offsetTop;

        const linesDown = Math.floor((cursorTop - Math.abs(translateY)) / 45);

        if (linesDown >= 1) {
            setTranslateY((prevY) => prevY - 45);
        }
    }, [currentWordIndex, currentLetterIndex]); // rerun whenever cursor moves


  return (
    <div className="text-display" ref={textDisplayRef} style={{ transform: `translateY(${translateY}px)` }}>
      {words.map((word, wi) => (
        <span key={wi} className="word">
          {word.split("").map((letter, li) => {
            const isCursor = (wi === currentWordIndex && li === currentLetterIndex);

            const isIncorrect = incorrectLetters.has(`${wi},${li}`);
            const isCorrect = correctLetters.has(`${wi},${li}`);

            let className = "";
            if (isCursor) className = "cursor";
            else if (isIncorrect) className = "incorrect";
            else if (isCorrect) className = "correct";

            

            return (
              <span key={`${wi}-${li}`} className={className}>
                {letter}
              </span>
            );
          })}
            <span
            className={`space${
                wi === currentWordIndex && currentLetterIndex === word.length
                ? " cursor"
                : ""
            }`}
            >
                &nbsp;
            </span>
        </span>
      ))}
     </div>
  );
};

export default TypingText;
