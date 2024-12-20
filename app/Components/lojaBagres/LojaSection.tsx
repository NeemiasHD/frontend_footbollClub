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
        className="backgroundLoja"
        style={{
          display: "flex",
          backgroundImage: "url(./img/texturafundobagres.png)",
          backgroundSize: "100%",
          justifyContent: "center",
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
            alignItems: "center",
          }}
        >
          <img className="PosterBagresLoja" src="./img/bagresstoreposter.png" />
          <div
            className="ProdutosContainer"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/*produto*/}
            {usuarioSecao?.user?.role == "admin" && <CriarProduto />}
            <Produto
              nome="camisa bagres 1"
              imagemUrl="/img/testeimgloja.png"
              valor="79,90"
            />
            <Produto
              nome="camisa bagres 2"
              imagemUrl="/img/testeimg2loja.png"
              valor="79,90"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LojaSection;
