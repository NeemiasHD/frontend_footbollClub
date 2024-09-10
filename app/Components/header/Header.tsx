"use client";
import { UseBagresContext } from "@/app/Context/BagresContext";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiCrown, BiMenu } from "react-icons/bi";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import MenuUsuario from "./MenuUsuario";

function Header() {
  const { usuarioSecao, setUsuarioSecao } = UseBagresContext();
  const [menuUsuarioAtivado, setMenuUsuarioAtivado] = useState(false);

  return (
    <>
      {/*inicio componente menu de usuario*/}

      {menuUsuarioAtivado && (
        <MenuUsuario setMenuUsuarioAtivado={setMenuUsuarioAtivado} />
      )}

      {/*fim componente menu de usuario*/}
      <div className="HeaderContainer" style={{ alignItems: "center" }}>
        <Link href={"/"} style={{ textDecoration: "none" }}>
          <img className="logoBagresHeader" src="./img/logobagres.png" />
        </Link>

        <div className="HeaderNav" id="HeaderNav">
          <p className="NavBtn">Notícias</p>
          <p className="NavBtn">Calendário</p>
          <p className="NavBtn">Estatísticas</p>
          <p className="NavBtn">Jogadores</p>
          <p className="NavBtn">Fotos</p>
          <Link href={"/Bagrescup"} className="NavBtn">
            Bagres CUP
          </Link>
          <p className="NavBtn">Loja</p>

          {usuarioSecao?.user?.foto ? (
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
                  src={usuarioSecao.user.foto}
                  style={{ height: "100%", cursor: "pointer" }}
                />
              </div>
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
    </>
  );
}

export default Header;
