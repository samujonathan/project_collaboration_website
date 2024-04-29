import React from "react";

const Label = ({ className,htmlFor, children }) => {
    return (
        <label htmlFor={htmlFor} className={className}>
        {children}
        </label>
    );

}

export default Label;
