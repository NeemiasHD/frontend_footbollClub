"use client";
import React, { useEffect, useState } from "react";
import "./Components.css";

function Welcomebanner() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY / 50);
    };

    // Adiciona o listener de scroll quando o componente é montado
    window.addEventListener("scroll", handleScroll);

    // Remove o listener de scroll quando o componente é desmontado
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="welcomeMain">
      <div className="imgcontainer">
        <img
          className="imgWelcome"
          src="./img/imgbanner.png"
          style={
            scrollY < 11
              ? {
                  filter: `blur(${scrollY}px) brightness(${
                    100 - scrollY * 3
                  }%)`,
                }
              : { display: "none" }
          }
        />
        <div className="msgcontainer" style={{ maxWidth: "1500px" }}>
          <img
            className="mensageWelcome"
            src="./img/bemvindo.png"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Welcomebanner;
