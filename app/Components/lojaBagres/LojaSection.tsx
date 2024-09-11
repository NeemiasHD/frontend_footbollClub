"use client";
import React from "react";
import HeaderSection from "../headerSection/HeaderSection";
import { Rating } from "react-simple-star-rating";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";
import { BiCart } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import Produto from "./Produto";
import CriarProduto from "./CriarProduto";
import { UseBagresContext } from "@/app/Context/BagresContext";

function LojaSection() {
  const { usuarioSecao } = UseBagresContext();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundImage: "url(./img/texturafundobagres.png)",
          backgroundSize: "100%",

          backgroundColor: "var(--corazul)",
          padding: "30px",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <img src="./img/bagresstoreposter.png" style={{ height: "620px" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexWrap: "wrap",
              maxHeight: "620px",
              gap: "10px",
            }}
          >
            {/*produto*/}
            {usuarioSecao?.user?.role == "admin" && <CriarProduto />}
            <Produto />
            <Produto />
            <Produto />
            <Produto />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LojaSection;
