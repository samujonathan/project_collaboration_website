import React from "react";

const Input = ({ className,type, placeholder }) => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      
    />
  );
}

export default Input;