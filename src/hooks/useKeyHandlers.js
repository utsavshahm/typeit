import { useEffect } from "react";

export const useKeyHandlers = (
  text,
  isRunning,
  currentWordIndex,
  currentWordLetterIndex,
  setCurrentWordIndex,
  setCurrentWordLetterIndex,
  incorrectLetters,
  setIncorrectLetters, 
  correctLetters, 
  setCorrectLetters
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
            if (e.getModifierState("CapsLock")) {
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

      if ((e.shiftKey && e.key==='Shift') || e.altKey || e.ctrlKey || !isRunning) {
        e.preventDefault();
        return;
      }
      
      const words = text.split(" ");
      const currentWord = words[currentWordIndex] || "";
      const currentChar = currentWord[currentWordLetterIndex];

      // SPACE
      if (e.key === " ") {
        e.preventDefault();
        if (currentWordLetterIndex > 0) {
          setCurrentWordIndex((prev) => prev + 1);
          setCurrentWordLetterIndex(0);
        }
        return;
      }

      // BACKSPACE
      if (e.key === "Backspace") {
        e.preventDefault();

        // If at start of word, go to end of previous word
        if (currentWordLetterIndex === 0 && currentWordIndex > 0) {
          return;
        } else {
          setCurrentWordLetterIndex((prev) => Math.max(prev - 1, 0));
        }

        const key = `${currentWordIndex},${currentWordLetterIndex - 1}`;
        setIncorrectLetters((prev) => {
          const newMap = new Map(prev);
          newMap.delete(key);
          return newMap;
        });
        setCorrectLetters((prev) => {
          const newMap = new Map(prev);
          newMap.delete(key);
          return newMap;
        });

        return;
      }

      // NON-TYPABLE CHARACTERS (skip)
      if (e.key.length !== 1) return;

    //   updateTypedCharacters((prev) => prev + 1);

      const key = `${currentWordIndex},${currentWordLetterIndex}`;

      // CORRECT
      if (e.key === currentChar) {
        if (incorrectLetters.has(key)) {
          setIncorrectLetters((prev) => {
            const newMap = new Map(prev);
            newMap.delete(key);
            return newMap;
          });
        }
        setCorrectLetters((prev) => {
          const newMap = new Map(prev);
          newMap.set(key, true);
          return newMap;
        });
        // updateCorrectlyTyped((prev) => prev + 1);
      } else {
        setIncorrectLetters((prev) => {
          const newMap = new Map(prev);
          newMap.set(key, true);
          return newMap;
        });
      }

      if (currentWordLetterIndex < currentWord.length) {
        setCurrentWordLetterIndex((prev) => prev + 1);
      } else {
        // Move to next word if word complete
        // setCurrentWordIndex((prev) => prev + 1);
        // setCurrentWordLetterIndex(0);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    text,
    isRunning,
    currentWordIndex,
    currentWordLetterIndex,
    incorrectLetters,
    setCurrentWordIndex,
    setCurrentWordLetterIndex,
    setIncorrectLetters,
  ]);
};
