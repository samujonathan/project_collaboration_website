// Link.js
import React from "react";

const LogoLink = ({ className, href, icon, text }) => {
  return (
    <a href={href} className={`flex items-center ${className}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {text && <span>{text}</span>}
    </a>
  );
};

export default LogoLink;
