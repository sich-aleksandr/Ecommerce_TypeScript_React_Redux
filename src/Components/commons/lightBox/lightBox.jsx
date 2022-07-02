import React, { useState } from "react";

export const LightBox = ({
  children,
  src,
  alt,
  Wrapper = "div",
  zIndex = 100,
  key,
  className,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={toggleIsOpen} key={key} className={className} style={style}>
      {children}
      {isOpen ? (
        <div
          onClick={toggleIsOpen}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0,0,0,0.7)",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex,
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              height: "85%",
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
