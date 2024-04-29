import React from "react";

const Link = ({ className, href, text }) => {
  return (
    <a href={href} className={className}>
      {text}
    </a>
  );
};

export default Link;
