import React, { useState, useEffect, useMemo } from "react";

const TypingBackSpacing = ({className}) => {
  const [text, setText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const phrases = useMemo(
    () => ["Collaborate", "Innovate", "Together"],
    []
  );

  useEffect(() => {
    let currentIndex = 0;
    let isTyping = true;

    const intervalId = setInterval(() => {
      if (currentIndex <= phrases[currentPhraseIndex].length && isTyping) {
        setText(phrases[currentPhraseIndex].slice(0, currentIndex));
        currentIndex++;
      } else {
        isTyping = false;
        if (currentIndex >= 0) {
          setText(phrases[currentPhraseIndex].slice(0, currentIndex));
          currentIndex--;
        } else {
          isTyping = true;
          setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      }
    }, 100); // Adjust the interval time as needed

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [currentPhraseIndex, phrases]);

  return (
    <div className={className}>
      <span>{text}</span>
      <span className="animate-ping">|</span>
    </div>
  )
};

export default TypingBackSpacing;
