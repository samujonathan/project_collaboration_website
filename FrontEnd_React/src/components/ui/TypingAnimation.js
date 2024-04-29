import React, { useState, useEffect } from "react";

const TypingAnimation = ({Text,className}) => {
  const [text, setText] = useState("");
    const originalText = Text;

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= originalText.length) {
        setText(originalText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100); // Adjust the interval time as needed

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [originalText]);

  return (
    <div className="space-y-5">
      <p className={className}>
        {text}
      </p>
    </div>
  );
};




export default TypingAnimation;
