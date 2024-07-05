// keyHandlers.js

import { useEffect } from "react";
import changeColor from "../pages/Home/typeUtils/changeColor.js";
import moveCursor from "../pages/Home/typeUtils/moveCursor.js";

export const useKeyHandlers = (
  textRef,
  currentWordIndex,
  currentWordLetterIndex,
  isRunning,
  updateTypedCharacters,
  updateCorrectlyTyped,
  setcurrentWordIndex,
  setcurrentWordLetterIndex
) => {
  useEffect(() => {
    const handleKeyDown = (e) => {

      const caps = document.getElementById("caps");
      if (e.getModifierState("CapsLock")) {
        if (caps) {
          caps.style.opacity = 1;
        }
      }

      if (e.key === "CapsLock") {
        e.preventDefault();

        const caps = document.getElementById("caps");
        if (!e.getModifierState("CapsLock")) {
          if (caps) {
            caps.style.opacity = 1;
          }
        }
        else {
            if (caps) {
              caps.style.opacity = 0;
            }
        }
        return; // Prevent further handling for Caps Lock key
      }

      if (e.shiftKey || e.altKey || e.ctrlKey) {
        e.preventDefault();
        return;
      }

      const textElement = textRef.current;
      if (!textElement) return;

      const textArray = textElement.innerText.split(" ");

      if (e.key === " ") {
        e.preventDefault();
        var flag = false; 
        if (currentWordLetterIndex > 0) {
          setcurrentWordIndex((prevIndex) => prevIndex + 1);
          setcurrentWordLetterIndex(0);
          flag = true; 
        }
        moveCursor("", false, true, textRef, flag ? currentWordIndex + 1 : currentWordIndex , 0);
      } else if (
        e.key === textArray[currentWordIndex][currentWordLetterIndex] &&
        e.key != " "
      ) {
        changeColor(
          true,
          false,
          false,
          textRef,
          currentWordIndex,
          currentWordLetterIndex
        );
        updateCorrectlyTyped((prevIndex) => prevIndex + 1);

        moveCursor(
          e.key,
          true,
          false,
          textRef,
          currentWordIndex,
          currentWordLetterIndex
        );

        if (currentWordLetterIndex < textArray[currentWordIndex].length - 1) {
          setcurrentWordLetterIndex((prevIndex) => prevIndex + 1);
        } else {
          setcurrentWordIndex((prevIndex) => prevIndex + 1);
          setcurrentWordLetterIndex(0);
          // moveCursor("", false, true, textRef, currentWordIndex + 1, 0);
        }
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
        updateCorrectlyTyped((prevIndex) => prevIndex + 1);
        moveCursor(
          e.key,
          false,
          false,
          textRef,
          currentWordIndex,
          currentWordLetterIndex
        );
      } else {
        changeColor(
          false,
          false,
          false,
          textRef,
          currentWordIndex,
          currentWordLetterIndex
        );
        setcurrentWordLetterIndex((prevIndex) => prevIndex + 1);
        moveCursor(
          e.key,
          true,
          false,
          textRef,
          currentWordIndex,
          currentWordLetterIndex
        );
      }

      updateTypedCharacters((prevTotal) => prevTotal + 1);
    };

    const handleBackspace = () => {
      if (currentWordLetterIndex >= 0) {
        setcurrentWordLetterIndex((prevIndex) => prevIndex - 1);
      }

      changeColor(
        false,
        true,
        false,
        textRef,
        currentWordIndex,
        currentWordLetterIndex
      );
      moveCursor(
        "Backspace",
        false,
        false,
        textRef,
        currentWordIndex,
        currentWordLetterIndex
      );
    };

    const handleKeyUp = (e) => {
      if (e.key === "Backspace") {
        handleBackspace();
        setcurrentWordLetterIndex((prevIndex) => prevIndex + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [textRef, currentWordIndex, currentWordLetterIndex, isRunning]);
};
