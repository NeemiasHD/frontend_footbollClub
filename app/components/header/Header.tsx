"use client";
import { UseBagresContext } from "@/app/Context/BagresContext";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import React, { useState } from "react";
import { BiCrown } from "react-icons/bi";

function Header() {
  const { usuarioSecao, setUsuarioSecao } = UseBagresContext();
  const [menuUsuarioAtivado, setMenuUsuarioAtivado] = useState(false);

  return (
    <div className="HeaderContainer">
      <Link href={"/"} style={{ textDecoration: "none" }}>
        <img className="logoBagresHeader" src="./img/logobagres.png" />
      </Link>
      <div className="HeaderNav">
        <p className="NavBtn">Notícias</p>
        <p className="NavBtn">Calendário</p>
        <p className="NavBtn">Estatísticas</p>
        <p className="NavBtn">Jogadores</p>
        <p className="NavBtn">Fotos</p>
        <p className="NavBtn">Bagres CUP</p>
        <p className="NavBtn">Loja</p>
        {usuarioSecao?.foto ? (
          <>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <img
                onClick={() => {
                  setMenuUsuarioAtivado(!menuUsuarioAtivado);
                }}
                src={usuarioSecao.foto}
                style={{ height: "100%" }}
              />
            </div>
            {menuUsuarioAtivado && (
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                  zIndex: 100,
                  top: 50,
                  right: 0,
                  padding: "10px",
                  gap: "20px",
                  textAlign: "center",
                }}
              >
                {usuarioSecao.tipoConta === 1 && (
                  <p style={{ color: "yellow", textShadow: "1px 1px 1px" }}>
                    <BiCrown />
                  </p>
                )}
                <p style={{ fontSize: "12px" }}>{usuarioSecao.nome}</p>
                <p
                  onClick={() => {
                    setUsuarioSecao(null);
                    deleteCookie("Usuario");
                  }}
                  style={{ fontSize: "12px", color: "red", cursor: "pointer" }}
                >
                  Logout
                </p>
              </div>
            )}
          </>
        ) : (
          <Link
            href={"/Login"}
            className="NavBtn"
            style={{ textDecoration: "none" }}
          >
            Entrar
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
