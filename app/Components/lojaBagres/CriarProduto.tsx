"use client";
import React from "react";
import InputProdutoImg from "./InputProdutoImg";


function CriarProduto() {
  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "white",
        boxShadow: "0px 0px 30px var(--cinzaEscuro)",
        height: "305px",
      }}
    >
      <div>
        <InputProdutoImg id="InputProdutoImg" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <div>
          <input
            type="text"
            className="input"
            placeholder="Descrição curta produto"
            style={{ border: "1px solid gray", width: "100%", padding: "2px" }}
          />
        </div>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            className="input"
            placeholder="Valor"
            style={{ border: "1px solid gray", padding: "2px" }}
          />
          <p
            style={{
              backgroundColor: "var(--corazul)",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              cursor: "pointer",
            }}
          >
            criar
          </p>
        </div>
      </div>
    </div>
  );
}

export default CriarProduto;
