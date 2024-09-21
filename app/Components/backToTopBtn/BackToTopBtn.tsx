"use client";
import React, { useEffect, useState } from "react";
import { BsArrowUp } from "react-icons/bs";

function BackToTopBtn() {
  const [scrollY, setScrollY] = useState(0);
  const [isvisible, setisvisible] = useState(-40);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    // Adiciona o listener de scroll quando o componente é montado
    window.addEventListener("scroll", handleScroll);

    // Remove o listener de scroll quando o componente é desmontado
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (scrollY > 100) {
      setisvisible(10);
    } else {
      setisvisible(-40);
    }
  }, [scrollY]);
  return (
    <div
      style={{
        position: "fixed",
        right: `${isvisible}px`,
        bottom: "10px",
        backgroundColor: "var(--corazul)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        zIndex: "105",
        color: "white",
        cursor: "pointer",
        borderRadius: "50px",
        transition: "all .3s",
        boxShadow: "0px 0px 10px var(--cinza)",
      }}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <BsArrowUp />
    </div>
  );
}

export default BackToTopBtn;
